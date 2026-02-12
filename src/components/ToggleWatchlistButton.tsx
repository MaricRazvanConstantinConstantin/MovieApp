export default function ToggleWatchlistButton({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      aria-label={checked ? 'In watchlist' : 'Not in watchlist'}
      onClick={onChange}
      className={[
        'relative inline-flex h-10 w-full min-w-0 sm:max-w-64',
        'px-12',
        'items-center rounded-full border overflow-hidden',
        'bg-alabaster-grey-400 border-alabaster-grey-500',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-dusk-blue-500',
      ].join(' ')}
    >
      <span
        aria-hidden='true'
        className={[
          'absolute inset-0 bg-dusk-blue-600',
          'origin-left transition-transform duration-400 ease-out',
          checked ? 'scale-x-100' : 'scale-x-0',
        ].join(' ')}
      />

      <span
        className={[
          'relative z-10 block w-full text-center text-sm font-medium',
          'whitespace-nowrap overflow-hidden text-ellipsis',
          'transition-colors duration-500',
          checked ? 'text-white' : 'text-ink-black',
        ].join(' ')}
      >
        {checked ? 'In watchlist' : 'Not in watchlist'}
      </span>

      <span
        aria-hidden='true'
        className={[
          'absolute left-1 right-1',
          'flex',
          checked ? 'justify-end' : 'justify-start',
        ].join(' ')}
      >
        <span
          className={[
            'h-7 w-7 rounded-full shadow',
            'bg-alabaster-grey-900',
          ].join(' ')}
        />
      </span>
    </button>
  );
}
