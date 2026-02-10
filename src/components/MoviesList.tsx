import {useMoviesContext} from '../context';
import MoviesCard from './MoviesCard';

export default function MoviesList() {
  const {filteredMovies} = useMoviesContext();

  return (
    <ul className='movies-list'>
      {filteredMovies.map((m) => {
        return (
          <li key={m.id}>
            <MoviesCard movie={m} />
          </li>
        );
      })}
    </ul>
  );
}
