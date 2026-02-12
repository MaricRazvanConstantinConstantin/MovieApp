import {useMoviesContext} from '../context';

export default function MovieDetailsModal() {
  const {selectedMovie, setSelectedMovie} = useMoviesContext();

  if (!selectedMovie) return null;

  const movie = selectedMovie;

  return (
    <div
      className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedMovie(null);
      }}
    >
      <div className='bg-white p-6 rounded-xl max-w-lg w-full'>
        <h2 className='text-lg font-semibold mb-4'>{movie.title}</h2>
        <div className='flex gap-4 mb-4'>
          <img
            src={'src/assets/images/' + movie.image}
            alt={movie.title}
            className='w-24 h-36 object-cover rounded-md shadow-sm'
          />
          <p className='text-sm text-gray-700'>
            {movie.description ?? 'No description available.'}
          </p>
        </div>
        <div className='mb-4 text-sm text-gray-600'>
          <p>
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
        </div>
        <div className='mb-4'>
          <h3 className='text-sm font-semibold mb-2'>Actors</h3>

          {movie.actors?.length ? (
            <ul className='list-disc pl-5 space-y-1 text-sm'>
              {movie.actors.map((actor, i) => (
                <li key={i}>{actor}</li>
              ))}
            </ul>
          ) : (
            <p className='text-sm text-gray-600'>No actors listed.</p>
          )}
        </div>
        <button
          onClick={() => setSelectedMovie(null)}
          className='h-10 px-4 rounded-full bg-gray-900 text-white hover:bg-black transition-colors'
        >
          Close
        </button>
      </div>
    </div>
  );
}
