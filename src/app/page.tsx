import FlashCards from '~/components/FlashCards';
import Footer from '~/components/Footer';

export default function Home() {
  return (
    <div className='flex flex-col justify-between px-20 py-8'>
      <h1 className='pb-8 text-4xl font-bold text-center'>AI Generated Mandarin Flashcards</h1>
      {/* @ts-expect-error */}
      <FlashCards />
      <Footer />
    </div>
  );
}
