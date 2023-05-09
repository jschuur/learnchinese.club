'use client';

import HSKBadge from '~/components/HSKBadge';
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
      <div className='px-2 my-3 bg-red-100 rounded-lg sm:my-6'>
        <div className='flex flex-row items-center gap-2 py-2 text-lg sm:text-2xl'>
          <PlayButton card={card} />
          {card.mandarin}
          <HSKBadge hskLevel={card.hskLevel} />
        </div>
        <div className='text-base sm:pt-2 sm:text-xl'>{card.pinyin}</div>
        <div className='text-base sm:text-xl'>{card.english}</div>

        <div className='p-2 text-sm font-light sm:text-lg text-slate-600'>{card.grammar}</div>
        <Vocabulary vocabulary={card.vocabulary} />
      </div>
    )
  );
}
