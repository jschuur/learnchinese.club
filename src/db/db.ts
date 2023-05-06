import { createPool, sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';

export const db = drizzle(
  process.env.NODE_ENV === 'production'
    ? sql
    : createPool({
        connectionString: process.env.POSTGRES_URL,
      })
);

import { languageCard, NewLanguageCard } from './schema';

export async function dbMigrate() {
  await migrate(db, { migrationsFolder: './drizzle' });
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

export function getCards() {
  return (
    db
      .select()
      .from(languageCard)
      // .orderBy(sql<number>`random()`)
      .limit(5)
  );
}
