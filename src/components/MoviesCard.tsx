import {useMoviesContext, type Movie} from '../context';
import ToggleWatchlistButton from './ToggleWatchlistButton';

export default function MoviesCard({movie}: {movie: Movie}) {
  const {watchlist, addToWatchList, removeFromWatchlist, setSelectedMovie} =
    useMoviesContext();
  const inWatchlist = watchlist.some((w) => w.id === movie.id);

  const toggleWatchlist = () =>
    inWatchlist ? removeFromWatchlist(movie.id) : addToWatchList(movie.id);

  return (
    <div className='movie-card'>
      <img
        src={'src/assets/images/' + movie.image}
        alt={movie.title}
        className='movie-card__poster'
        loading='lazy'
      />

      <div className='body'>
        <h3 className='title'>{movie.title}</h3>

        <div className='meta'>
          <span className='genre'>{movie.genre}</span>
          <p className='text-prussian-blue-500'> | </p>
          <span
            className={
              'rating ' +
              (movie.rating < 5
                ? 'text-red-400'
                : movie.rating < 8
                  ? 'text-yellow-400'
                  : 'text-green-400')
            }
          >
            {movie.rating}
          </span>
        </div>

        <div className='actions gap-3'>
          <ToggleWatchlistButton
            checked={inWatchlist}
            onChange={toggleWatchlist}
          />

          <button
            className='btn btn-primary rounded-2xl'
            onClick={() => setSelectedMovie(movie)}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
