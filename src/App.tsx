import {useEffect} from 'react';
import {useMoviesContext} from './context';
import MoviesPage from './pages/MoviesPage';

export default function App() {
  const {loadMoviesFromJSON} = useMoviesContext();

  useEffect(() => {
    loadMoviesFromJSON('/movies.json');
  }, []);

  return (
    <>
      <MoviesPage />
    </>
  );
}
