import {useMoviesContext} from '../context';
import Loader from './Loader';
import MoviesCard from './MoviesCard';

export default function MoviesList() {
  const {filteredMovies, loading, error} = useMoviesContext();

  if (loading) return <Loader />;
  if (error) return <div style={{color: 'crimson'}}>Error: {error}</div>;

  if (filteredMovies.length === 0) {
    return (
      <div className='sm:py-12 text-center' role='status' aria-live='polite'>
        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dusk-blue-600 text-white shadow'>
          <svg
            viewBox='0 0 24 24'
            className='h-6 w-6'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M4 5a1 1 0 0 1 1-1h2v2H5v2H3V5a1 1 0 0 1 1-1Zm4-1h8v2H8V4Zm10 0h2a1 1 0 0 1 1 1v2h-2V4h-1V3ZM3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Zm2 2v6h14v-6H5ZM5 4H4v1h1V4Zm15 1h1V4h-1v1Z' />
          </svg>
        </div>

        <h2 className='text-lg sm:text-xl font-semibold text-ink-black'>
          No movies found
        </h2>
        <p className='mt-1 text-sm text-prussian-blue-700'>
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <ul
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 list-none p-15
         h-[calc(100vh-12rem)] overflow-auto'
    >
      {filteredMovies.map((m) => (
        <li key={m.id}>
          <MoviesCard movie={m} />
        </li>
      ))}
    </ul>
  );
}
