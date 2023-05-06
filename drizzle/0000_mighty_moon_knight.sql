CREATE TABLE IF NOT EXISTS "cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"hsklevel" smallint NOT NULL,
	"difficulty" text NOT NULL,
	"mandarin" text NOT NULL,
	"english" text NOT NULL,
	"pinyin" text NOT NULL,
	"vocabulary" text[][] NOT NULL,
	"grammar" text NOT NULL,
	"audio" text
);
