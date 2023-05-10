import { sql as sqlVercel } from '@vercel/postgres';
import { eq, sql as sqlDrizzle } from 'drizzle-orm';
import { drizzle as drizzleNode } from 'drizzle-orm/node-postgres';
import { migrate as migrateNode } from 'drizzle-orm/node-postgres/migrator';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { migrate as migrateVercel } from 'drizzle-orm/vercel-postgres/migrator';
// import 'server-only';

import { Pool } from 'pg';

import { languageCard, NewLanguageCard } from './schema';

export const db =
  process.env.NODE_ENV === 'production'
    ? drizzleVercel(sqlVercel)
    : drizzleNode(new Pool({ connectionString: process.env.POSTGRES_URL }));

export async function dbMigrate() {
  if (process.env.NODE_ENV === 'production')
    await migrateVercel(db, { migrationsFolder: './drizzle' });
  else await migrateNode(db, { migrationsFolder: './drizzle' });
}

export function insertCard(card: NewLanguageCard) {
  try {
    return db.insert(languageCard).values(card).onConflictDoNothing().returning();
  } catch {
    console.log('Error inserting card');
  }
}

export function updateCard(id: number, data: Partial<NewLanguageCard>) {
  return db.update(languageCard).set(data).where(eq(languageCard.id, id)).returning();
}

export function getRandomCards() {
  return db
    .select({
      id: languageCard.id,
      hskLevel: languageCard.hskLevel,
      mandarin: languageCard.mandarin,
      english: languageCard.english,
      pinyin: languageCard.pinyin,
      vocabulary: languageCard.vocabulary,
      grammar: languageCard.grammar,
      audioHash: languageCard.audioHash,
    })
    .from(languageCard)
    .orderBy(sqlDrizzle`random()`)
    .limit(5);
}

export async function getCardAudioBase64(id: number) {
  const res = await db
    .select({ audio: languageCard.audio })
    .from(languageCard)
    .where(eq(languageCard.id, id));

  return !res?.[0]?.audio ? null : Buffer.from(res[0].audio, 'base64');
}
