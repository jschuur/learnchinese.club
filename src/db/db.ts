import { eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { languageCard, NewLanguageCard } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

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
  return db
    .select()
    .from(languageCard)
    .orderBy(sql<number>`random()`)
    .limit(5);
}
