import { AxiosResponse } from 'axios';
import fs from 'fs';
import tts from 'google-translate-tts';
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import ora from 'ora';

import { insertCard, updateCard } from '~/db/db';
import { LanguageCard, insertLanguageCardSchema } from '~/db/schema';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_APIKEY,
});

type GenerateCardOptions = Pick<LanguageCard, 'hskLevel' | 'cardLength'>;

const OPENAI_MODEL = 'gpt-3.5-turbo';
const OPENAI_TEMPERATURE = 1.0;
const OPENAI_MAX_TOKENS = 2048;
const OPENAI_SYSTEM_PROMPT = 'You are a helpful assistant';

const openai = new OpenAIApi(configuration);

async function saveAudio(id: number | undefined, mandarin: string, saveAudio: boolean = false) {
  console.log(`Generating audio for ${mandarin}...`);
  const buffer = await tts.synthesize({
    text: mandarin,
    voice: 'zh-CN',
    slow: false,
  });
  console.log(`Saving audio...`);

  if (saveAudio) fs.writeFileSync(`public/audio/mandarin-${id}.mp3`, buffer);

  return buffer.toString('base64');
}

async function processCards(
  response: AxiosResponse<CreateChatCompletionResponse, any>,
  options: GenerateCardOptions
) {
  const responseContent = response.data.choices[0].message?.content;
  let cardsCreated = 0;

  console.log('Usage: ', response.data.usage);

  if (!responseContent) throw new Error('OpenAI response missing choice');

  if (!(typeof responseContent === 'string'))
    throw new Error('Response message content is not a string');

  let cardResponse;

  // try to parse the response as a JSON object
  try {
    cardResponse = JSON.parse(responseContent);
  } catch {
    console.log('Response message content: ', response.data.choices[0].message?.content);

    // if it didn't parse, try to extract the JSON object from a code block
    const responseJSONBlock = responseContent.match(/```([\s\S]*?)```/)?.[0];

    if (!responseJSONBlock) throw new Error('Response did not contain a JSON object');
    else {
      try {
        cardResponse = JSON.parse(responseContent);
      } catch {
        throw new Error('Failed to parse JSON object from code block match');
      }

      console.log(`Extracted JSON object from card that didn\'t initially parse`);
    }
  }

  // prompt should always return a array, but just in case, convert it to one
  if (!Array.isArray(cardResponse)) cardResponse = [cardResponse];

  for (const card of cardResponse) {
    const parsedCard = insertLanguageCardSchema.safeParse(card);

    if (!parsedCard.success) console.log(`Failed to parse card: ${parsedCard.error} ${card}`);
    else {
      const newCard = { ...parsedCard.data, ...options };
      const { mandarin, english } = newCard;

      console.log(`New card: ${mandarin} (${english})`);

      const insertedCard = await insertCard(newCard);
      const insertedCardId = insertedCard?.[0]?.id;

      if (insertedCardId) {
        const audio = await saveAudio(insertedCardId, mandarin);
        await updateCard(insertedCardId, { audio });

        cardsCreated++;
      }
    }
  }

  return cardsCreated;
}

export async function generateCards(count: number, options: GenerateCardOptions) {
  const { cardLength, hskLevel } = options;

  const cardPrompt = `Create ${count} ${cardLength} length random Mandarin Chinese sentences with an overall HSK ${hskLevel} difficulty level, based on the HSK 2.0 version for language learning flashcards. Format the sentences as an array of JSON objects with the following fields: The 'mandarin' sentence using simplified Chinese characters, the 'pinyin', the 'english' translation, the 'vocabulary' as an array of arrays like this: ['mandarin', 'pinyin', 'english'] for each vocabulary item, and a 'grammar' explanation for this sentence. Do not explain every word for 'grammar', focus on grammatical concepts You response should only be the JSON and no other text. The grammar field should be in complete sentences, spoken in the style of a teacher. Always return an array of objects even if there is only one sentence.`;

  const spinner = ora(`Generating ${count} ${cardLength} HSK ${hskLevel} cards...`).start();
  const response = await openai.createChatCompletion({
    model: OPENAI_MODEL,
    temperature: OPENAI_TEMPERATURE,
    max_tokens: OPENAI_MAX_TOKENS,
    messages: [
      // { role: 'system', content: OPENAI_SYSTEM_PROMPT },
      { role: 'user', content: cardPrompt },
    ],
  });
  spinner.succeed(`OpenAI response received, processing...`);

  return processCards(response, options);
}
