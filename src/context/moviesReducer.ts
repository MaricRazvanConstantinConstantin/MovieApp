import {
  type MoviesState,
  type MoviesContextAction,
  initialState,
} from './moviesTypes';

export function moviesReducer(
  state: MoviesState,
  action: MoviesContextAction,
): MoviesState {
  switch (action.type) {
    case 'LOAD_MOVIES_START':
      return {...state, loading: true, error: null};

    case 'LOAD_MOVIES_SUCCESS':
      return {...state, loading: false, movies: action.payload.movies};

    case 'LOAD_MOVIES_FAILURE':
      return {...state, loading: false, error: action.payload.error};

    case 'ADD_TO_WATCHLIST': {
      const movie = state.movies.find((m) => m.id === action.payload.id);
      if (!movie) return state;
      if (state.watchlist.some((m) => m.id === movie.id)) return state;
      return {...state, watchlist: [...state.watchlist, movie]};
    }

    case 'REMOVE_FROM_WATCHLIST':
      return {
        ...state,
        watchlist: state.watchlist.filter((m) => m.id !== action.payload.id),
      };

    case 'SET_GENRE_FILTERS':
      return {
        ...state,
        filters: {...state.filters, genres: [...action.payload.genres]},
      };

    case 'SET_SORT':
      return {
        ...state,
        filters: {
          ...state.filters,
          sort: {...action.payload.sortSpecifications},
        },
      };

    case 'SET_ONLY_IN_WATCHLIST':
      return {
        ...state,
        filters: {...state.filters, onlyInWatchlist: action.payload.value},
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        filters: {...state.filters, searchQuery: action.payload.searchQuery},
      };

    case 'SET_SELECTED_MOVIE':
      return {
        ...state,
        selectedMovie: action.payload.selectedMovie,
      };

    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {...initialState.filters},
      };

    default:
      return state;
  }
}
