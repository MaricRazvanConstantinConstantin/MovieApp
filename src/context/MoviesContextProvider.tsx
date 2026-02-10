import {useReducer, useMemo, type ReactNode} from 'react';
import type {Movie} from './moviesTypes';
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
