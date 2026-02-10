export type Genre = 'drama' | 'fantasy' | 'horror' | 'action';
export const GENRES = ['drama', 'fantasy', 'horror', 'action'] as const;

export type Movie = {
  id: number;
  title: string;
  image: string;
  genre: Genre;
  rating: number;
  description: string;
  actors: string[];
};

export type SortField = 'rating' | 'title';
export type SortDirection = 'asc' | 'desc';
export type SortSpecifications = {
  field: SortField;
  direction: SortDirection;
};

export type MoviesFilters = {
  genres: Genre[];
  sort: SortSpecifications;
  onlyInWatchlist: boolean;
};

export type MoviesState = {
  movies: Movie[];
  watchlist: Movie[];
  loading: boolean;
  error: string | null;
  filters: MoviesFilters;
};

export const initialState: MoviesState = {
  movies: [],
  watchlist: [],
  loading: false,
  error: null,
  filters: {
    genres: [],
    sort: {field: 'title', direction: 'asc'},
    onlyInWatchlist: false,
  },
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
  payload: Pick<Movie, 'id'>;
};

export type RemoveFromWatchlistAction = {
  type: 'REMOVE_FROM_WATCHLIST';
  payload: Pick<Movie, 'id'>;
};

export type SetGenreFiltersAction = {
  type: 'SET_GENRE_FILTERS';
  payload: {genres: Genre[]};
};

export type SetSortAction = {
  type: 'SET_SORT';
  payload: {sortSpecifications: SortSpecifications};
};

export type SetOnlyInWatchlistAction = {
  type: 'SET_ONLY_IN_WATCHLIST';
  payload: {value: boolean};
};

export type ClearFiltersAction = {
  type: 'CLEAR_FILTERS';
};

export type MoviesContextAction =
  | LoadMoviesStartAction
  | LoadMoviesSuccessAction
  | LoadMoviesFailureAction
  | AddToWatchlistAction
  | RemoveFromWatchlistAction
  | SetGenreFiltersAction
  | SetSortAction
  | SetOnlyInWatchlistAction
  | ClearFiltersAction;
