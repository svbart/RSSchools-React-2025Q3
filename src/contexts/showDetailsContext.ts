import { createContext } from 'react';

export interface IShowDetailsContext {
  setSelectedPlanetId: () => void;
}

export const ShowDetailsContext = createContext<IShowDetailsContext | null>(
  null
);
