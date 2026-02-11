import {useEffect} from 'react';
import {useMoviesContext} from './context';
import MoviesPage from './pages/MoviesPage';

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
