'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import FlashCard from '~/components/FlashCard';
import RefreshCards from '~/components/RefreshCards';

import { type LanguageCard } from '~/db/schema';

import useAudio, { audioQueryKey, fetchAudio } from '~/hooks/useAudio';
import useHasMounted from '~/hooks/useHasMounted';

export const dynamic = 'force-dynamic';

const getCards = async () => {
  const res = await fetch('/api/cards', { cache: 'no-store' });
  const json = await res.json();

  return json;
};

export default function FlashCardList() {
  const hasMounted = useHasMounted();
  const queryClient = useQueryClient();
  useAudio();

  const { data: cards } = useQuery<LanguageCard[]>({
    queryKey: ['flashcards'],
    queryFn: getCards,
  });

  useEffect(() => {
    if (hasMounted && cards && cards?.[0]?.id > 0) {
      queryClient.prefetchQuery({
        queryKey: audioQueryKey(cards[0]),
        queryFn: fetchAudio(cards[0]),
      });
    }
  }, [cards, queryClient, hasMounted]);

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
