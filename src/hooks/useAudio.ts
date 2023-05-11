'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { LanguageCard } from '~/db/schema';

export const fetchAudio = (card: LanguageCard) => () =>
  fetch(`/audio/${card.id}?hash=${card.audioHash}`).then((res) => res.blob());
export const audioQueryKey = (card: LanguageCard) => ['audio', card?.id];

export default function useAudio() {
  const [playCard, setPlayCard] = useState<LanguageCard | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function playAudio() {
      if (!playCard) return;

      const cardAudio = await queryClient.fetchQuery({
        queryKey: audioQueryKey(playCard),
        queryFn: fetchAudio(playCard),
        cacheTime: Infinity,
        staleTime: Infinity,
      });

      const audio = new Audio(URL.createObjectURL(cardAudio));
      audio.play();

      setPlayCard(null);
    }

    playAudio();
  }, [playCard, queryClient]);

  return setPlayCard;
}
