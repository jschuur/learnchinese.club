import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { languageCardSchema, NewLanguageCard } from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

export async function dbMigrate() {
  await migrate(db, { migrationsFolder: './drizzle' });
}

export function insertCard(card: NewLanguageCard) {
  try {
    return db.insert(languageCardSchema).values(card).onConflictDoNothing().returning();
  } catch {
    console.log('Error inserting card');
  }
}

export function updateCard(id: number, data: Partial<NewLanguageCard>) {
  return db.update(languageCardSchema).set(data).where(eq(languageCardSchema.id, id)).returning();
}

export function getCards() {
  return db.select().from(languageCardSchema);
}
