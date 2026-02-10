import {useContext} from 'react';
import {MoviesContext} from './MoviesContext';

export function useMoviesContext() {
  const ctx = useContext(MoviesContext);
  if (!ctx) {
    throw new Error(
      'MoviesContext is falsy - Provider is missing in the tree.',
    );
  }
  return ctx;
}
