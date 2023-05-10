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
      className='w-8 cursor-pointer sm:w-10'
      onClick={() => {
        playClipId(card);
        va.track('Play Audio', { clipId: card.id });
      }}
    />
  );
}
