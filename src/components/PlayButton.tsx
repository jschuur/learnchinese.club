import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import useSound from 'use-sound';

type Props = {
  soundFile: string;
};

export default function PlayButton({ soundFile }: Props) {
  const [play] = useSound(soundFile);

  return <SpeakerWaveIcon className='w-6' onClick={() => play()} />;
}
