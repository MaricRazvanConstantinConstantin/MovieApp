import {useMoviesContext} from '../context';
import {MoviesCard} from './MoviesCard';

export function Watchlist() {
  const {watchlist} = useMoviesContext();

  if (!watchlist.length) return <p>Your watchlist is empty.</p>;

  return (
    <ul style={{display: 'grid', gap: 8, listStyle: 'none', padding: 0}}>
      {watchlist.map((m) => (
        <li key={m.id} style={{display: 'flex', gap: 8, alignItems: 'center'}}>
          <MoviesCard movie={m} />
        </li>
      ))}
    </ul>
  );
}
