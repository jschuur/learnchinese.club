type Props = {
  hskLevel: number;
};

export default function HSKBadge({ hskLevel }: Props) {
  return (
    <span className='px-2 py-1 ml-auto mr-2 text-xs font-semibold tracking-wider text-white bg-green-600 border rounded-md whitespace-nowrap font- items-top'>
      HSK {hskLevel}
    </span>
  );
}
