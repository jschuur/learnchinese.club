'use client';

import PlayButton from '~/components/PlayButton';
import Vocabulary from '~/components/Vocabulary';

import { LanguageCard } from '~/db/schema';

type Props = {
  card: LanguageCard;
  index: number;
};

export default function FlashCard({ card, index }: Props) {
  return (
    card && (
      <div className='px-2 my-6 bg-red-100 rounded-lg'>
        <div className='flex flex-row items-center gap-2 px-2 py-2 text-2xl'>
          <PlayButton card={card} />
          {card.mandarin}
        </div>
        <div className='pt-2 text-xl'>{card.pinyin}</div>
        <div className='text-xl'>{card.english}</div>

        <div className='p-2 text-lg font-light text-slate-600'>{card.grammar}</div>
        <Vocabulary vocabulary={card.vocabulary} />
      </div>
    )
  );
}