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
        // Fluid width inside the card; cap on larger screens if desired
        'relative inline-flex h-10 w-full min-w-0 sm:max-w-64',
        // Ensure the label area has reserved space for the knob on BOTH sides
        // (knob ≈ 2rem + ~0.5rem gaps → use px-12 for safe clearance)
        'px-12',
        // Layout & chrome
        'items-center rounded-full border overflow-hidden select-none',
        'bg-alabaster-grey-400 border-alabaster-grey-500',
        // Focus
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-dusk-blue-500',
        // Transitions
        'transition-colors duration-300',
      ].join(' ')}
    >
      {/* Fill track that scales (no width calculations needed) */}
      <span
        aria-hidden='true'
        className={[
          'absolute inset-0 bg-dusk-blue-600',
          'origin-left transition-transform duration-300 ease-out',
          checked ? 'scale-x-100' : 'scale-x-0',
        ].join(' ')}
      />

      {/* The label: centered, non-wrapping, no resize impact */}
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

      {/* Knob rail — positions knob responsively with no overlap */}
      <span
        aria-hidden='true'
        className={[
          // Place rail inside the inner padding (match px-12, so use 0.5rem (2) + knob spacing)
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

      <div className='movie-card__body'>
        <h3 className='movie-card__title'>{movie.title}</h3>

        <div className='movie-card__meta'>
          <span className='movie-card__genre'>{movie.genre}</span>
          <span
            className={
              'movie-card__rating ' +
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

        <div className='movie-card__actions'>
          <ToggleWatchlistButton
            checked={inWatchlist}
            onChange={toggleWatchlist}
          />
        </div>
      </div>
    </div>
  );
}
