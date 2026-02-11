import {useMoviesContext, type Movie} from '../context';

function ToggleWatchlistButton({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      aria-label={checked ? 'In watchlist' : 'Not in watchlist'}
      onClick={onChange}
      className={[
        'relative inline-flex h-10 w-full min-w-0 sm:max-w-64',
        'px-12',
        'items-center rounded-full border overflow-hidden select-none',
        'bg-alabaster-grey-400 border-alabaster-grey-500',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-dusk-blue-500',
        'transition-colors duration-300',
      ].join(' ')}
    >
      <span
        aria-hidden='true'
        className={[
          'absolute inset-0 bg-dusk-blue-600',
          'origin-left transition-transform duration-300 ease-out',
          checked ? 'scale-x-100' : 'scale-x-0',
        ].join(' ')}
      />

      <span
        className={[
          'relative z-10 block w-full text-center text-sm font-medium',
          'whitespace-nowrap overflow-hidden text-ellipsis',
          'transition-colors duration-300',
          checked ? 'text-white' : 'text-ink-black',
        ].join(' ')}
      >
        {checked ? 'In watchlist' : 'Not in watchlist'}
      </span>

      <span
        aria-hidden='true'
        className={[
          'absolute left-1 right-1',
          'flex',
          checked ? 'justify-end' : 'justify-start',
        ].join(' ')}
      >
        <span
          className={[
            'h-7 w-7 rounded-full shadow',
            'bg-alabaster-grey-900',
          ].join(' ')}
        />
      </span>
    </button>
  );
}

export default function MoviesCard({movie}: {movie: Movie}) {
  const {watchlist, addToWatchList, removeFromWatchlist} = useMoviesContext();
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

        <div className='actions'>
          <ToggleWatchlistButton
            checked={inWatchlist}
            onChange={toggleWatchlist}
          />
        </div>
      </div>
    </div>
  );
}
