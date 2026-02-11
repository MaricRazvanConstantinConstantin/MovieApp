import {useEffect} from 'react';
import {useMoviesContext} from './context';
import MoviesList from './components/MoviesList';
import FilterBar from './components/FilterBar';

export default function App() {
  const {loadMoviesFromJSON, loading, error} = useMoviesContext();

  useEffect(() => {
    loadMoviesFromJSON('/movies.json');
  }, []);

  if (loading) return <div>Loading movies………</div>;
  if (error) return <div style={{color: 'crimson'}}>Error: {error}</div>;

  return (
    <>
      <MoviesPage />
    </>
  );
}
