import {useMoviesContext, type Movie} from '../context';

export default function MoviesCard({movie}: {movie: Movie}) {
  const {watchlist, addToWatchList, removeFromWatchlist} = useMoviesContext();
  const inWatchlist = watchlist.some((w) => w.id === movie.id);

  return (
    <div className='movie-card'>
      <img
        src={'src/assets/images/' + movie.image}
        alt={movie.title}
        className='movie-card__poster'
        loading='lazy'
      />

      <div className='movie-card__body'>
        <h3 className='movie-card__title'>{movie.title}</h3>

        <div className='movie-card__meta'>
          <span className='movie-card__genre'>{movie.genre}</span>
          <span className='movie-card__rating'>⭐ {movie.rating}</span>
        </div>

        <div className='movie-card__actions'>
          {inWatchlist ? (
            <button
              className='btn btn-ghost'
              onClick={() => removeFromWatchlist(movie.id)}
            >
              Remove from watchlist
            </button>
          ) : (
            <button
              className='btn btn-primary'
              onClick={() => addToWatchList(movie.id)}
            >
              Add to watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
