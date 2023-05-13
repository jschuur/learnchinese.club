import { atom } from 'jotai';

import { LanguageCard } from '~/db/schema';

export const playCardAtom = atom<LanguageCard | null>(null);
export const previousCardAtom = atom<LanguageCard | null>(null);
