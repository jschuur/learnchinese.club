import 'dotenv/config';

import { dbMigrate } from '~/db/db';
import { generateCards } from './lib';

const seedData = [
  [5, 'short', 1],
  [5, 'medium', 1],
  [5, 'long', 1],
  [5, 'short', 2],
  [5, 'medium', 2],
  [5, 'long', 2],
  [5, 'short', 3],
  [5, 'medium', 3],
  [3, 'long', 3],
  [5, 'short', 4],
  [5, 'medium', 4],
  [3, 'long', 4],
  [5, 'short', 5],
  [5, 'medium', 5],
  [3, 'long', 5],
  [5, 'short', 6],
  [3, 'medium', 6],
  [3, 'long', 6],
] as const;

(async () => {
  try {
    await dbMigrate();

    for (const batch of seedData) {
      const [count, cardLength, hskLevel] = batch;

      try {
        await generateCards(count, {
          cardLength,
          hskLevel: hskLevel,
        });
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
      }
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
})();
