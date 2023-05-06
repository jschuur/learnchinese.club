import 'dotenv/config';
import pluralize from 'pluralize';

import { dbMigrate } from '~/db/db';
import { generateCards } from './lib';

(async () => {
  try {
    await dbMigrate();

    const cardsCreated = await generateCards(5, { cardLength: 'medium', hskLevel: 1 });

    console.log(`${pluralize('card', cardsCreated, true)} generated!`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
  }
})();
