import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import { ReactNode, useCallback } from 'react';

type Props = {
  children: ReactNode;
};

function Refresh() {
  const queryClient = useQueryClient();

  const refreshList = useCallback(() => {
    queryClient.invalidateQueries(['flashcards']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [queryClient]);

  return (
    <div className='flex flex-row justify-end'>
      <button
        className='flex flex-row items-center gap-2 px-4 py-2 text-black bg-red-100 border border-red-300 rounded-md hover:bg-red-200'
        onClick={refreshList}
      >
        <ArrowPathIcon className='w-6' /> new sentences
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
