import {useReducer, useMemo, type ReactNode} from 'react';
import type {Genre, Movie, MoviesState, SortSpecifications} from './moviesTypes';
import {initialState} from './moviesTypes';
import {moviesReducer} from './moviesReducer';
import {MoviesContext, type MoviesContextValue} from './MoviesContext';

export function MoviesContextProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const loadMoviesFromJSON = async (filePath: string) => {
    dispatch({type: 'LOAD_MOVIES_START', payload: {filepath: filePath}});
    try {
      const response = await fetch(filePath);
      if (!response.ok)
        throw new Error(
          `Failed to load movies: ${response.status} ${response.statusText}`,
        );

      const data: Movie[] = await response.json();
      dispatch({type: 'LOAD_MOVIES_SUCCESS', payload: {movies: data}});
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'LOAD_MOVIES_FAILURE',
        payload: {error: err instanceof Error ? err.message : 'Unknown error'},
      });
    }
  };

  const addToWatchList = (id: number) =>
    dispatch({type: 'ADD_TO_WATCHLIST', payload: {id}});

  const removeFromWatchlist = (id: number) =>
    dispatch({type: 'REMOVE_FROM_WATCHLIST', payload: {id}});

  const setGenreFilter = (genres: Genre[]) =>
    dispatch({type: 'SET_GENRE_FILTERS', payload: {genres}});

  const setSort = (sort: SortSpecifications) =>
    dispatch({type: 'SET_SORT', payload: {sortSpecifications: sort}});

  const setOnlyInWatchlist = (value: boolean) =>
    dispatch({type: 'SET_ONLY_IN_WATCHLIST', payload: {value}});

  const clearFilters = () => dispatch({type: 'CLEAR_FILTERS'});

  const filteredMovies = useMemo(
    () => applyFilters(state.movies, state.watchlist, state.filters),
    [state.movies, state.watchlist, state.filters],
  );

  const value: MoviesContextValue = useMemo(
    () => ({
      ...state,
      filteredMovies,
      loadMoviesFromJSON,
      addToWatchList,
      removeFromWatchlist,
      setGenreFilter,
      setSort,
      setOnlyInWatchlist,
      clearFilters,
    }),
    [state, filteredMovies],
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}

function applyFilters(
  movies: Movie[],
  watchlist: Movie[],
  filters: MoviesState['filters'],
): Movie[] {
  const base = filters.onlyInWatchlist ? watchlist : movies;

  const byGenre =
    filters.genres.length === 0
      ? base
      : base.filter((m) => filters.genres.includes(m.genre));

  const {field, direction} = filters.sort;
  const dir = direction === 'asc' ? 1 : -1;

  const collator = new Intl.Collator(undefined, {
    sensitivity: 'base',
    numeric: true,
  });

  const sorted = [...byGenre].sort((a, b) => {
    if (field === 'rating') {
      const cmp = a.rating === b.rating ? 0 : a.rating < b.rating ? -1 : 1;
      return cmp * dir;
    } else {
      const cmp = collator.compare(a.title, b.title);
      return cmp * dir;
    }
  });

  return sorted;
}
