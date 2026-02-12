import {createContext} from 'react';
import type {
  Genre,
  Movie,
  MoviesState,
  SortSpecifications,
} from './moviesTypes';

export type MoviesContextValue = MoviesState & {
  filteredMovies: Movie[];

  loadMoviesFromJSON: (filePath: string) => Promise<void>;
  addToWatchList: (id: number) => void;
  removeFromWatchlist: (id: number) => void;

  setGenreFilter: (genres: Genre[]) => void;
  setSort: (sort: SortSpecifications) => void;
  setOnlyInWatchlist: (value: boolean) => void;
  setSearchQuery: (saerchQuery: string) => void;
  setSelectedMovie: (selectedMovie: Movie | null) => void;
  clearFilters: () => void;
};

export const MoviesContext = createContext<MoviesContextValue | null>(null);
