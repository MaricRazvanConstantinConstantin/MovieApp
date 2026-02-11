import {useMoviesContext} from '../context';

export default function SearchBar() {
  const {filters, setSearchQuery} = useMoviesContext();

  return (
    <form
      className='searchbar'
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        id='search-input'
        type='text'
        className='input-text'
        placeholder='Search…'
        value={filters.searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button
        type='button'
        className='btn btn-outline bg-red-400'
        onClick={() => {
          setSearchQuery('');
        }}
      >
        Clear
      </button>
    </form>
  );
}
