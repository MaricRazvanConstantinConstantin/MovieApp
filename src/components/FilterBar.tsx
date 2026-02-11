import {GENRES, useMoviesContext} from '../context';
import type {SortSpecifications, Genre} from '../context';

export default function FilterBar() {
  const {filters, setGenreFilter, setSort, setOnlyInWatchlist} =
    useMoviesContext();
  return (
    <div className='filter-bar'>
      <label className='filter-label'>
        Genres:
        <select
          value={filters.genres[0]}
          className='filter-select'
          onChange={(e) => {
            const raw = Array.from(e.target.selectedOptions).map(
              (o) => o.value as Genre,
            );
            const selected = raw.includes('all' as Genre)
              ? []
              : raw.filter((g) => g !== ('all' as Genre));

            setGenreFilter(selected);
          }}
        >
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </label>

      <label className='filter-label'>
        Sort by:
        <select
          className='filter-select'
          value={`${filters.sort.field}:${filters.sort.direction}`}
          onChange={(e) => {
            const [field, direction] = e.target.value.split(':') as [
              SortSpecifications['field'],
              SortSpecifications['direction'],
            ];
            setSort({field, direction});
          }}
        >
          <option value='title:asc'>Name ↑</option>
          <option value='title:desc'>Name ↓</option>
          <option value='rating:asc'>Rating ↑</option>
          <option value='rating:desc'>Rating ↓</option>
        </select>
      </label>

      <label className='filter-checkbox'>
        <input
          type='checkbox'
          checked={filters.onlyInWatchlist}
          onChange={(e) => setOnlyInWatchlist(e.target.checked)}
        />
        Show only watchlist
      </label>
    </div>
  );
}
