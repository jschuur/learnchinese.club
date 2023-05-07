import 'dotenv/config';
import pluralize from 'pluralize';

import { dbMigrate } from '~/db/db';
import { generateCards } from './lib';

(async () => {
  try {
    const [count, cardLength, hskLevel] = process.argv.slice(2);

    await dbMigrate();

    const cardsCreated = await generateCards(parseInt(count, 10), {
      cardLength,
      hskLevel: parseInt(hskLevel, 10),
    });

    console.log(`${pluralize('card', cardsCreated, true)} generated!`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
})();
