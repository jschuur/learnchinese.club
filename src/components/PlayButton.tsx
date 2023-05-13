import { SpeakerWaveIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';

import { LanguageCard } from '~/db/schema';
import { playCardAtom } from '~/store';

type Props = {
  card: LanguageCard;
};

export default function PlayButton({ card }: Props) {
  const [, setPlayCard] = useAtom(playCardAtom);

  return (
    <SpeakerWaveIcon
      className='w-8 cursor-pointer sm:w-10'
      onClick={() => {
        setPlayCard(card);
      }}
    />
  );
}
