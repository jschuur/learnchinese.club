import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import va from '@vercel/analytics';
import { ReactNode, useCallback } from 'react';

type Props = {
  children: ReactNode;
};

function Refresh() {
  const queryClient = useQueryClient();

  const refreshList = useCallback(() => {
    queryClient.invalidateQueries(['flashcards']);
    va.track('Refresh Cards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [queryClient]);

  return (
    <div className='flex flex-row justify-end'>
      <button
        className='flex flex-row items-center gap-2 px-2 py-1 text-black bg-red-100 border border-red-300 rounded-md sm:px-4 sm:py-2 hover:bg-red-200'
        onClick={refreshList}
      >
        <ArrowPathIcon className='w-6 text-sm sm:text-base' /> new sentences
      </button>
    </div>
  );
}

export default function RefreshCards({ children }: Props) {
  return (
    <div className='flex flex-col justify-center'>
      <Refresh />
      {children}
      <Refresh />
    </div>
  );
}
