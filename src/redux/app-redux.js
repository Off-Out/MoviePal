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

//
// Action Creators
//
export const setGeoLocation = location => {
  return {
    type: SET_GEOLOCATION,
    value: location,
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
        latitude: action.value.latitude,
        longitude: action.value.longitude,
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
