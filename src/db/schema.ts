import { InferModel } from 'drizzle-orm';
import { pgTable, serial, smallint, text } from 'drizzle-orm/pg-core';

export const languageCardSchema = pgTable('cards', {
  id: serial('id').primaryKey(),

  hskLevel: smallint('hsklevel').notNull(),
  difficulty: text('difficulty').notNull(),
  mandarin: text('mandarin').notNull(),
  english: text('english').notNull(),
  pinyin: text('pinyin').notNull(),
  vocabulary: text('vocabulary').array().array().notNull(),
  grammar: text('grammar').notNull(),
  audio: text('audio'),
});

export type NewLanguageCard = InferModel<typeof languageCardSchema, 'insert'>;
export type LanguageCard = InferModel<typeof languageCardSchema>;
