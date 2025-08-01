import { createContext, Dispatch, SetStateAction } from 'react';

interface IShowDetailsContext {
  setSelectedPlanetId: Dispatch<SetStateAction<number | null>>;
}

export const ShowDetailsContext = createContext<IShowDetailsContext | null>(
  null
);
