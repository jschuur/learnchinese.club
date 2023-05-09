import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import va from '@vercel/analytics';

import { LanguageCard } from '~/db/schema';
import useAudio from '~/hooks/useAudio';

type Props = {
  card: LanguageCard;
};

export default function PlayButton({ card }: Props) {
  const playClipId = useAudio();

  return (
    <SpeakerWaveIcon
      className='w-10 cursor-pointer'
      onClick={() => {
        playClipId(card.id);
        va.track('Play Audio', { clipId: card.id });
      }}
    />
  );
}
