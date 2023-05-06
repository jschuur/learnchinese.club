import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';

import { LanguageCard } from '~/db/schema';

type Props = {
  card: LanguageCard;
};

export default function PlayButton({ card }: Props) {
  const audioDataUri = `data:audio/mpeg;base64,${card.audio}`;
  const [play] = useSound(audioDataUri);

  return <SpeakerWaveIcon className='w-6' onClick={() => play()} />;
}
