import { getCardAudioBase64 } from '~/db/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const cardId = Number(params.id);
  const notFoundResponse = new Response(`Audio clip for ID ${cardId} not found`, { status: 404 });

  if (isNaN(cardId)) return notFoundResponse;

  const audioData = await getCardAudioBase64(Number(params.id));

  if (!audioData) return notFoundResponse;

  return new Response(audioData, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': `public, immutable`,
    },
  });
}
