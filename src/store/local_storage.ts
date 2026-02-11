import type {Movie, MoviesState} from '../context';

export const LS_KEYS = {
  filters: 'app:movies:filters:v1',
  watchlist: 'app:movies:watchlist:v1',
};

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Swallow to avoid breaking the app if storage is full/blocked
  }
}

export function initFromStorage(state: MoviesState): MoviesState {
  const hydratedFilters = readJSON<MoviesState['filters']>(
    LS_KEYS.filters,
    state.filters,
  );
  const hydratedWatchlist = readJSON<Movie[]>(
    LS_KEYS.watchlist,
    state.watchlist,
  );

  return {
    ...state,
    filters: hydratedFilters,
    watchlist: hydratedWatchlist,
  };
}
