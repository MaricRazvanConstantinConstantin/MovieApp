import FilterBar from './FilterBar';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header
      className={[
        // layout
        'relative w-full flex flex-col items-center',
        // background & decoration using your palette
        'bg-gradient-to-br from-dusk-blue-600 via-prussian-blue-600 to-ink-black',
        // spacing
        'px-6 py-3',
        // subtle shadow
        'shadow-sm',
      ].join(' ')}
    >
      <div className='relative mx-auto flex flex-col items-center'>
        <h1 className='mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-alabaster-grey-900'>
          <span className='bg-gradient-to-r from-alabaster-grey-900 to-alabaster-grey-700 bg-clip-text text-transparent'>
            Movies Explorer
          </span>
        </h1>

        <p className='mt-2 max-w-2xl text-sm sm:text-base text-alabaster-grey-700'>
          Discover, filter and curate your next watch. For everyone, on every
          mood.
        </p>
      </div>
      <div className='actions-bar'>
        <SearchBar />
        <FilterBar />
      </div>
    </header>
  );
}
