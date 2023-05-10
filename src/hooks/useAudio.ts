import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { LanguageCard } from '~/db/schema';

export const audioUrl = (card: LanguageCard) => `/audio/${card.id}?hash=${card.audioHash}`;
export const audioQueryKey = (card: LanguageCard) => ['audio', card?.id];

export default function useAudio() {
  const [playCard, setPlayCard] = useState<LanguageCard | null>(null);
  const [localClips, setLocalClips] = useState<Record<number, Blob>>({});

  useEffect(() => {
    if (playCard && localClips[playCard.id]) {
      const audio = new Audio(URL.createObjectURL(localClips[playCard.id]));
      audio.play();

      setPlayCard(null);
    }
  }, [playCard, localClips]);

  useQuery({
    queryKey: audioQueryKey(playCard!),
    queryFn: () => playCard && fetch(audioUrl(playCard)),
    enabled: Boolean(playCard?.id && localClips[playCard?.id] === undefined),
    onSuccess: async (data) => {
      if (!data) return;

      const audioData = await data.blob();

      setLocalClips((clips) => (playCard?.id ? { ...clips, [playCard?.id]: audioData } : clips));
    },
  });

  return setPlayCard;
}
