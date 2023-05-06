import { AxiosResponse } from 'axios';
import fs from 'fs';
import tts from 'google-translate-tts';
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';

import { insertCard, updateCard } from '~/db/db';
import { LanguageCard, languageCardSchema } from '~/db/schema';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});

type GenerateCardOptions = {
  hskLevel: number;
  difficulty: string;
};

const OPENAI_MODEL = 'gpt-3.5-turbo';
const OPENAI_TEMPERATURE = 1.0;
const OPENAI_MAX_TOKENS = 2048;
const OPENAI_SYSTEM_PROMPT = 'You are a helpful assistant';

const openai = new OpenAIApi(configuration);

async function saveFile(
  id: number | undefined,
  mandarin: string,
  languageCode: string,
  english: string
) {
  console.log(`Generating audio for ${mandarin}...`);
  const buffer = await tts.synthesize({
    text: mandarin,
    voice: languageCode,
    slow: false,
  });
  console.log(`Saving audio...`);

  fs.writeFileSync(`public/audio/mandarin-${id}.mp3`, buffer);

  return buffer.toString('base64');
}

async function processCards(
  response: AxiosResponse<CreateChatCompletionResponse, any>,
  options: GenerateCardOptions
): Promise<LanguageCard[]> {
  const languageCards: LanguageCard[] = [];
  const responseContent = response.data.choices[0].message?.content;

  console.log('Usage: ', response.data.usage);

  if (!responseContent) throw new Error('OpenAI response missing choice');

  if (!(typeof responseContent === 'string'))
    throw new Error('Response message content is not a string');

  let cardResponse;

  if (!Array.isArray(cardResponse)) cardResponse = [cardResponse];

  try {
    cardResponse = JSON.parse(responseContent);
    if (!Array.isArray(cardResponse)) cardResponse = [cardResponse];
  } catch {
    console.log('Response message content: ', response.data.choices[0].message?.content);

    const cardResponse = responseContent.match(/```([\s\S]*?)```/)?.[0];

    if (!cardResponse) throw new Error('Response did not contain a JSON object');
    else console.log(`Extracted JSON object from card that didn\'t initially parse`);
  }

  cardResponse.map(async (card: unknown) => {
    const parsedCard = languageCardSchema.safeParse(card);

    if (!parsedCard.success) console.log(`Failed to parse card: ${parsedCard.error} ${card}`);
    else {
      parsedCard.data = { ...parsedCard.data, ...options };
      const { mandarin, english } = parsedCard.data;

      console.log(`New card: ${mandarin} (${english})`);

      const newCard = await insertCard(parsedCard.data);
      const newCardId = newCard?.[0]?.id;

      if (newCardId) {
        const audio = await saveFile(newCardId, mandarin, 'zh-CN', english);
        await updateCard(newCardId, { audio });
      }

      languageCards.push(parsedCard.data);
    }
  });

  return languageCards;
}

export async function generateCards(count: number, options: GenerateCardOptions) {
  const { difficulty, hskLevel } = options;

  const cardPrompt = `Create ${count} ${difficulty} Mandarin Chinese sentences using HSK${hskLevel} words for language learning flashcards. Format the sentences as an array of JSON objects with the following fields: The 'mandarin' sentence using simplified Chinese characters, the 'pinyin', the 'english' translation, the 'vocabulary' as an array of arrays like this: ['mandarin', 'pinyin', 'english'] for each vocabulary item, and a detailed explanation of the 'grammar'. Only respond with RFC8259 compliant JSON`;

  const response = await openai.createChatCompletion({
    model: OPENAI_MODEL,
    temperature: OPENAI_TEMPERATURE,
    max_tokens: OPENAI_MAX_TOKENS,
    messages: [
      // { role: 'system', content: OPENAI_SYSTEM_PROMPT },
      { role: 'user', content: cardPrompt },
    ],
  });

  return processCards(response, options);
}
