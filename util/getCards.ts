import 'dotenv/config';
import ora, { Ora } from 'ora';
import pluralize from 'pluralize';

import { dbMigrate } from '~/db/db';
import { generateCards } from './lib';

(async () => {
  let spinner: Ora | null = null;

  try {
    await dbMigrate();

    spinner = ora('Generating cards...').start();
    const cards = await generateCards(5, { difficulty: 'easy', hskLevel: 4 });

    spinner.succeed(`${pluralize('Card', cards.length, true)} generated!`);
  } catch (error) {
    if (spinner) spinner.fail((error as Error).message);
    else console.error(error);
  }
})();
