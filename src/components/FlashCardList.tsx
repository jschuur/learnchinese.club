'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import FlashCard from '~/components/FlashCard';
import RefreshCards from '~/components/RefreshCards';

import { type LanguageCard } from '~/db/schema';
import { audioQueryKey, audioUrl } from '~/hooks/useAudio';

const getCards = async () => {
  const res = await fetch('/api/cards', { cache: 'no-store' });
  const json = await res.json();

  return json;
};

export default function FlashCardList() {
  const queryClient = useQueryClient();
  const { data: cards } = useQuery<LanguageCard[]>({
    queryKey: ['flashcards'],
    queryFn: getCards,
  });

  useEffect(() => {
    if (cards?.length) {
      queryClient.prefetchQuery({
        queryKey: audioQueryKey(cards[0]),
        queryFn: () => fetch(audioUrl(cards[0])),
        staleTime: Infinity,
        cacheTime: Infinity,
      });
    }
  }, [cards, queryClient]);

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
