import { InferModel } from 'drizzle-orm';
import { pgTable, serial, smallint, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const languageCard = pgTable('language_cards', {
  id: serial('id').primaryKey(),

  hskLevel: smallint('hsklevel').notNull(),
  cardLength: text('cardLength'),
  mandarin: text('mandarin').notNull(),
  english: text('english').notNull(),
  pinyin: text('pinyin').notNull(),
  vocabulary: text('vocabulary').array().array().notNull(),
  grammar: text('grammar').notNull(),
  audio: text('audio'),
});

export const insertLanguageCardSchema = createInsertSchema(languageCard, {
  hskLevel: z.number().int().min(1).max(6).optional(),
  cardLength: z.enum(['short', 'medium', 'long']),
});
export const selectLanguageCardSchema = createSelectSchema(languageCard);

export type NewLanguageCard = InferModel<typeof languageCard, 'insert'>;
export type LanguageCard = InferModel<typeof languageCard>;
