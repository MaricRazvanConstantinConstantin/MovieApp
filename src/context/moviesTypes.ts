// moviesTypes.ts
export type Genre = 'drama' | 'fantasy' | 'horror' | 'action';

export type Movie = {
  id: number;
  title: string;
  image: string;
  genre: Genre;
  rating: number;
  description: string;
  actors: string[];
};

export type MoviesState = {
  movies: Movie[];
  watchlist: Movie[];
  loading: boolean;
  error: string | null;
};

export const initialState: MoviesState = {
  movies: [],
  watchlist: [],
  loading: false,
  error: null,
};

export type LoadMoviesStartAction = {
  type: 'LOAD_MOVIES_START';
  payload: {filepath: string};
};

export type LoadMoviesSuccessAction = {
  type: 'LOAD_MOVIES_SUCCESS';
  payload: {movies: Movie[]};
};

export type LoadMoviesFailureAction = {
  type: 'LOAD_MOVIES_FAILURE';
  payload: {error: string};
};

export type AddToWatchlistAction = {
  type: 'ADD_TO_WATCHLIST';
  payload: {id: number};
};

export type RemoveFromWatchlistAction = {
  type: 'REMOVE_FROM_WATCHLIST';
  payload: {id: number};
};

export type MoviesContextAction =
  | LoadMoviesStartAction
  | LoadMoviesSuccessAction
  | LoadMoviesFailureAction
  | AddToWatchlistAction
  | RemoveFromWatchlistAction;
