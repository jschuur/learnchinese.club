import { NextResponse } from 'next/server';

import { getRandomCards } from '~/db/db';

export const revalidate = 0;

export async function GET() {
  const cards = await getRandomCards();

  return NextResponse.json(cards);
}
