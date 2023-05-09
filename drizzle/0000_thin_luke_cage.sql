CREATE TABLE IF NOT EXISTS "language_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"hsklevel" smallint NOT NULL,
	"cardLength" text,
	"mandarin" text NOT NULL,
	"english" text NOT NULL UNIQUE,
	"pinyin" text NOT NULL,
	"vocabulary" text[][] NOT NULL,
	"grammar" text NOT NULL,
	"audio" text
);
