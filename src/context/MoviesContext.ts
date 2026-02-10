import {createContext} from 'react';
import type {MoviesState} from './moviesTypes';

export type MoviesContextValue = MoviesState & {
  loadMoviesFromJSON: (filePath: string) => Promise<void>;
  addToWatchList: (id: number) => void;
  removeFromWatchlist: (id: number) => void;
};

export const MoviesContext = createContext<MoviesContextValue | null>(null);
