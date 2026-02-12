import MoviesList from '../components/MoviesList';
import Header from '../components/Header';
import MovieDetailsModal from '../components/MovieDetailsModal';

export default function MoviesPage() {
  return (
    <>
      <Header />
      <MoviesList />
      <MovieDetailsModal />
    </>
  );
}
