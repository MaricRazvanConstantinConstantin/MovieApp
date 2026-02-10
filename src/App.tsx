import {useEffect} from 'react';
import {useMoviesContext} from './context';
import {MoviesList} from './components/MoviesList';
import {Watchlist} from './components/Watchlist';

export default function App() {
  const {loadMoviesFromJSON, loading, error} = useMoviesContext();

  useEffect(() => {
    loadMoviesFromJSON('/movies.json');
  }, []);

  if (loading) return <div>Loading movies………</div>;
  if (error) return <div style={{color: 'crimson'}}>Error: {error}</div>;

  return (
    <div style={{padding: 16}}>
      <h1>Movies</h1>
      <MoviesList />
      <h2>Watchlist</h2>
      <Watchlist />
    </div>
  );
}
