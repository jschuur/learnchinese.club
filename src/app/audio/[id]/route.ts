import { getCardAudio } from '~/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const cardId = Number(params.id);
  const notFoundResponse = new Response(`Audio clip for ID ${cardId} not found`, { status: 404 });

  if (isNaN(cardId)) return notFoundResponse;

  const cardAudio = await getCardAudio(Number(params.id));
  if (!cardAudio?.[0]?.audio) return notFoundResponse;

  const audioData = Buffer.from(cardAudio[0].audio, 'base64');

  return new Response(audioData, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
}
