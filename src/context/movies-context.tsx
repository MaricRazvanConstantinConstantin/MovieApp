import React, {
  createContext,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';

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

type MoviesState = {
  movies: Movie[];
  watchlist: Movie[];
  loading: boolean;
  error: string | null;
};

const initialState: MoviesState = {
  movies: [],
  watchlist: [],
  loading: false,
  error: null,
};

type LoadMoviesStartAction = {
  type: 'LOAD_MOVIES_START';
  payload: {filepath: string};
};

type LoadMoviesSuccessAction = {
  type: 'LOAD_MOVIES_SUCCESS';
  payload: {movies: Movie[]};
};

type LoadMoviesFailureAction = {
  type: 'LOAD_MOVIES_FAILURE';
  payload: {error: string};
};

type AddToWatchlistAction = {
  type: 'ADD_TO_WATCHLIST';
  payload: {id: number};
};

type RemoveFromWatchlistAction = {
  type: 'REMOVE_FROM_WATCHLIST';
  payload: {id: number};
};

type MoviesContextAction =
  | LoadMoviesStartAction
  | LoadMoviesSuccessAction
  | LoadMoviesFailureAction
  | AddToWatchlistAction
  | RemoveFromWatchlistAction;

type MoviesContextValue = MoviesState & {
  loadMoviesFromJSON: (filePath: string) => Promise<void>;
  addToWatchList: (id: number) => void;
  removeFromWatchlist: (id: number) => void;
};

const MoviesContext = createContext<MoviesContextValue | null>(null);

function moviesReducer(
  state: MoviesState,
  action: MoviesContextAction,
): MoviesState {
  switch (action.type) {
    case 'LOAD_MOVIES_START': {
      return {...state, loading: true, error: null};
    }
    case 'LOAD_MOVIES_SUCCESS': {
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        error: null,
      };
    }
    case 'LOAD_MOVIES_FAILURE': {
      return {...state, loading: false, error: action.payload.error};
    }
    case 'ADD_TO_WATCHLIST': {
      const movie = state.movies.find((m) => m.id === action.payload.id);
      if (!movie) return state;
      const alreadyIn = state.watchlist.some((m) => m.id === movie.id);
      return alreadyIn
        ? state
        : {...state, watchlist: [...state.watchlist, movie]};
    }
    case 'REMOVE_FROM_WATCHLIST': {
      return {
        ...state,
        watchlist: state.watchlist.filter((m) => m.id !== action.payload.id),
      };
    }
    default:
      return state;
  }
}

type MoviesContextProviderProps = {children: ReactNode};

export function MoviesContextProvider({children}: MoviesContextProviderProps) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const loadMoviesFromJSON = async (filePath: string) => {
    try {
      dispatch({type: 'LOAD_MOVIES_START', payload: {filepath: filePath}});
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(
          `Failed to load movies: ${response.status} ${response.statusText}`,
        );
      }
      const data: Movie[] = await response.json();
      dispatch({type: 'LOAD_MOVIES_SUCCESS', payload: {movies: data}});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      dispatch({type: 'LOAD_MOVIES_FAILURE', payload: {error: message}});
    }
  };

  const addToWatchList = (id: number) => {
    dispatch({type: 'ADD_TO_WATCHLIST', payload: {id}});
  };

  const removeFromWatchlist = (id: number) => {
    dispatch({type: 'REMOVE_FROM_WATCHLIST', payload: {id}});
  };

  const value: MoviesContextValue = useMemo(
    () => ({
      ...state,
      loadMoviesFromJSON,
      addToWatchList,
      removeFromWatchlist,
    }),
    [state],
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
