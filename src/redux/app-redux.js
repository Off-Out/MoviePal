import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { format } from 'date-fns';
import axios from 'axios';

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
  zipCode: null,
  theaters: [],
  favoriteAnimal: 'dog',
};

//
// Action Creators
//
const SET_GEOLOCATION = 'SET_GEOLOCATION';
const SET_MOVIES = 'SET_MOVIES';
const SET_THEATERS = 'FETCH_THEATERS';
const SET_ZIPCODE = 'SET_ZIPCODE';

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

export const setTheaters = theaters => {
  return {
    type: SET_MOVIES,
    theaters,
  };
};

export const setZipCode = zipcode => {
  return {
    type: SET_ZIPCODE,
    zipcode,
  };
};

//
// Thunk Creators
//
//
export const fetchTheaters = async theaterID => {
  const theaterInfo = theaterID.map(async id => {
    const { data: theater } = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres/${id}?api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    //console.log('single theater location', theater);
    console.log('single data location', theater);
    return theater;
  });

  const theaterDetails = await Promise.all(theaterInfo);
  console.log('please work', theaterDetails);
  // return dispatch => {
  //   dispatch(setTheaters(theaterInfo));
  // };
};
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
        movies: [...action.movies],
      };
    case SET_THEATERS:
      return {
        ...state,
        theaters: [action.theaters],
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
