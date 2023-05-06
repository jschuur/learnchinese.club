import WithSeparator from 'react-with-separator';

type Props = {
  vocabulary: string[][];
};

export default function Vocabulary({ vocabulary }: Props) {
  console.log('vocabulary', vocabulary);

  if (!vocabulary || !Array.isArray(vocabulary)) return null;
  return (
    vocabulary && (
      <div className='flex flex-row flex-wrap items-center justify-center gap-2 py-3 al text-normal'>
        <WithSeparator separator='&middot;'>
          {vocabulary.map(([mandarin, pinyin, english]) => (
            <span key={english}>
              {mandarin} ({pinyin}): {english}
            </span>
          ))}
        </WithSeparator>
      </div>
    )
  );
}
