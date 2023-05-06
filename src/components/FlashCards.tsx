import LanguageCard from '~/components/LanguageCard';
import { getCards } from '~/db/db';

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
