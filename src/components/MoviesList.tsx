import {useMoviesContext} from '../context';
import {MoviesCard} from './MoviesCard';

export function MoviesList() {
  const {movies} = useMoviesContext();

  if (!movies.length) return <p>No movies loaded yet.</p>;

  return (
    <ul className='movies-list'>
      {movies.map((movie) => {
        return (
          <li key={movie.id}>
            <MoviesCard movie={movie} />
          </li>
        );
      })}
    </ul>
  );
}
