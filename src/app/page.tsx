import FlashCards from '~/components/FlashCards';

export default function Home() {
  return (
    <main className='flex flex-col justify-between px-20 py-6'>
      <h1 className='pb-6 text-4xl font-bold text-center'>Mandarin Flashcards</h1>
      {/* @ts-expect-error */}
      <FlashCards />
    </main>
  );
}
