import LanguageCard from '~/components/LanguageCard';
import { getRandomCards } from '~/db/db';

async function getCards() {
  'use server';

  return getRandomCards();
}

export default async function FlashCards() {
  const cards = await getCards();

  return cards?.length ? (
    <>
      {cards.map((card) => (
        <LanguageCard key={card.id} card={card} />
      ))}
    </>
  ) : (
    <span className='italic'>No flashcards found</span>
  );
}
