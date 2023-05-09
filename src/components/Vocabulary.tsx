type Props = {
  vocabulary: string[][];
};

export default function Vocabulary({ vocabulary }: Props) {
  if (!vocabulary || !Array.isArray(vocabulary)) return null;

  return (
    vocabulary && (
      <div className='flex flex-row flex-wrap items-center justify-center gap-2 py-3 al text-normal'>
        {vocabulary.map(([mandarin, pinyin, english]) => (
          <span className='pr-2' key={english}>
            {mandarin} ({pinyin}): {english}
          </span>
        ))}
      </div>
    )
  );
}
