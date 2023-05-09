import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function useAudio() {
  const [clipId, setClipId] = useState<number | null>(null);
  const [localClips, setLocalClips] = useState<Record<number, Blob>>({});

  useEffect(() => {
    if (clipId && localClips[clipId]) {
      const audio = new Audio(URL.createObjectURL(localClips[clipId]));
      audio.play();

      setClipId(null);
    }
  }, [clipId, localClips]);

  useQuery({
    queryKey: ['audio', clipId],
    queryFn: () => fetch(`/audio/${clipId}`),
    enabled: Boolean(clipId && localClips[clipId] === undefined),
    onSuccess: async (data) => {
      const audioData = await data.blob();

      setLocalClips((clips) => ({ ...clips, [clipId as number]: audioData }));
    },
  });

  return setClipId;
}
