import {useMoviesContext} from '../context';
import MoviesCard from './MoviesCard';

export default function MoviesList() {
  const {filteredMovies} = useMoviesContext();

  if (filteredMovies.length === 0) {
    return (
      <div
        className={[
          // container
          'mx-auto max-w-3xl',
          'rounded-2xl border',
          'bg-alabaster-grey-900/70 border-alabaster-grey-600/30',
          'backdrop-blur-md shadow-sm',
          'px-6 py-10 sm:py-12',
          'text-center',
        ].join(' ')}
        role='status'
        aria-live='polite'
      >
        {/* Icon */}
        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dusk-blue-600 text-white shadow'>
          {/* Film icon (inline SVG) */}
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M4 5a1 1 0 0 1 1-1h2v2H5v2H3V5a1 1 0 0 1 1-1Zm4-1h8v2H8V4Zm10 0h2a1 1 0 0 1 1 1v2h-2V4h-1V3ZM3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Zm2 2v6h14v-6H5ZM5 4H4v1h1V4Zm15 1h1V4h-1v1Z' />
          </svg>
        </div>

        {/* Title */}
        <h2 className='text-lg sm:text-xl font-semibold text-ink-black'>
          No movies found
        </h2>

        {/* Subtitle */}
        <p className='mt-1 text-sm text-prussian-blue-700'>
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <ul className='movies-list'>
      {filteredMovies.map((m) => (
          <li key={m.id}>
            <MoviesCard movie={m} />
          </li>
      ))}
    </ul>
  );
}
