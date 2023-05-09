'use client';

import { useQuery } from '@tanstack/react-query';

import FlashCard from '~/components/FlashCard';
import RefreshCards from '~/components/RefreshCards';

import { type LanguageCard } from '~/db/schema';

const getCards = async () => {
  const res = await fetch('/api/cards', { cache: 'no-store' });
  const json = await res.json();

  return json;
};

export default function FlashCardList() {
  const { data: cards } = useQuery<LanguageCard[]>({
    queryKey: ['flashcards'],
    queryFn: getCards,
  });

  return cards?.length ? (
    <div>
      <RefreshCards>
        {cards.map((card, index) => (
          <FlashCard key={card.id} index={index} card={card} />
        ))}
      </RefreshCards>
    </div>
  ) : (
    <span className='italic'>No flashcards found</span>
  );
}
