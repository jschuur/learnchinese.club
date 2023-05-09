import { dehydrate } from '@tanstack/react-query';

import Hydrate from '~/app/Hydrate';
import FlashCards from '~/components/FlashCardList';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { getRandomCards } from '~/db/db';

import getQueryClient from '~/getQueryClient';

export const revalidate = 1;

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey: ['flashcards'], queryFn: getRandomCards });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className='flex flex-col justify-between px-20 py-8'>
        <Header />
        <FlashCards />
        <Footer />
      </div>
    </Hydrate>
  );
}
