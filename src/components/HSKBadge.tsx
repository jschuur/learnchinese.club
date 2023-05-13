type Props = {
  hskLevel: number;
};

export default function HSKBadge({ hskLevel }: Props) {
  const color = hskLevel <= 2 ? 'bg-green-600' : hskLevel <= 4 ? 'bg-orange-500' : 'bg-red-600';

  return (
    <span
      className={`px-2 py-1 ml-auto mr-2 text-xs font-semibold tracking-wider text-white ${color} border rounded-md whitespace-nowrap font- items-top`}
    >
      HSK {hskLevel}
    </span>
  );
}
