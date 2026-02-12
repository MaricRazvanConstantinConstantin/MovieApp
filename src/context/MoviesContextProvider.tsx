import {useReducer, useMemo, type ReactNode, useEffect} from 'react';
import type {
  Genre,
  Movie,
  MoviesState,
  SortSpecifications,
} from './moviesTypes';
import {initialState} from './moviesTypes';
import {moviesReducer} from './moviesReducer';
import {MoviesContext, type MoviesContextValue} from '.';
import {initFromStorage, LS_KEYS, writeJSON} from '../store/local_storage';

export function MoviesContextProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(
    moviesReducer,
    initialState,
    initFromStorage,
  );

  useEffect(() => {
    writeJSON(LS_KEYS.filters, state.filters);
  }, [state.filters]);

  useEffect(() => {
    writeJSON(LS_KEYS.watchlist, state.watchlist);
  }, [state.watchlist]);

  const loadMoviesFromJSON = async (filePath: string) => {
    dispatch({type: 'LOAD_MOVIES_START', payload: {filepath: filePath}});

    await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const setSearchQuery = (seachQuery: string) =>
    dispatch({type: 'SET_SEARCH_QUERY', payload: {searchQuery: seachQuery}});

  const setOnlyInWatchlist = (value: boolean) =>
    dispatch({type: 'SET_ONLY_IN_WATCHLIST', payload: {value}});

  const setSelectedMovie = (selectedMovie: Movie | null) =>
    dispatch({type: 'SET_SELECTED_MOVIE', payload: {selectedMovie}});

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
      setSearchQuery,
      setSelectedMovie,
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

  const q = (filters.searchQuery ?? '').trim().toLowerCase();
  const bySearch = q
    ? base.filter((m) => {
        const title = (m.title ?? '').toLowerCase();
        return title.includes(q);
      })
    : base;

  const byGenre =
    filters.genres.length === 0
      ? bySearch
      : bySearch.filter((m) => filters.genres.includes(m.genre));

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
