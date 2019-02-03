import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { format } from 'date-fns';

//
// Initial State
//

const initialState = {
  date: format(new Date(), 'YYYY-MM-DD'),
  latitude: null,
  longitude: null,
  movies: [],
  loading: true,
  userID: null,
  favoriteAnimal: 'dog',
};

//
// Action Creators
//
const SET_GEOLOCATION = 'SET_GEOLOCATION';
const SET_MOVIES = 'SET_MOVIES';

//
// Action Creators
//
export const setGeoLocation = location => {
  return {
    type: SET_GEOLOCATION,
    location,
  };
};

export const setMovies = movies => {
  return {
    type: SET_MOVIES,
    movies,
  };
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GEOLOCATION:
      return {
        ...state,
        latitude: action.location.latitude,
        longitude: action.location.longitude,
      };
    case SET_MOVIES:
      return {
        ...state,
        movies: [...state.movies, action.movies],
      };
    default:
      return state;
  }
};

//
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
