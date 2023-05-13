'use client';

import { useQueryClient } from '@tanstack/react-query';
import va from '@vercel/analytics';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { LanguageCard } from '~/db/schema';
import { playCardAtom, previousCardAtom } from '~/store';

export const fetchAudio = (card: LanguageCard) => () =>
  fetch(`/audio/${card.id}?hash=${card.audioHash}`).then((res) => res.blob());
export const audioQueryKey = (card: LanguageCard) => ['audio', card?.id];

export default function useAudio() {
  const [playCard, setPlayCard] = useAtom(playCardAtom);
  const [previousCard, setPreviousCard] = useAtom(previousCardAtom);
  const [isPlaying, setIsPlaying] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function playAudio() {
      if (!playCard || isPlaying) return;

      setIsPlaying(true);

      const cardAudio = await queryClient.fetchQuery({
        queryKey: audioQueryKey(playCard),
        queryFn: fetchAudio(playCard),
        cacheTime: Infinity,
        staleTime: Infinity,
      });

      const audio = new Audio(URL.createObjectURL(cardAudio));
      audio.play();

      if (!previousCard || previousCard.id !== playCard.id)
        va.track('Play Audio', { clipId: playCard.id });

      audio.addEventListener('ended', () => {
        setPlayCard(null);
        setIsPlaying(false);

        if (!previousCard || previousCard.id !== playCard.id) setPreviousCard(playCard);
      });
    }

    playAudio();
  }, [playCard, queryClient, previousCard, isPlaying, setPlayCard, setPreviousCard]);

  return setPlayCard;
}
