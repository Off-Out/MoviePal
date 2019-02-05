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
  theaters: [],
  loading: true,
  userID: null,
  zipCode: null,
  favoriteAnimal: 'dog',
};

//
// Action Creators
//
const SET_GEOLOCATION = 'SET_GEOLOCATION';
const SET_MOVIES = 'SET_MOVIES';
const SET_THEATERS = 'SET_THEATERS';
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
    type: SET_THEATERS,
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

//This fetch is only for a specific theater that is showing a chosen movie
export const fetchTheaters = theaterID => {
  return async dispatch => {
    const theaterInfo = theaterID.map(async id => {
      const { data: theater } = await axios.get(
        `http://data.tmsapi.com/v1.1/theatres/${id}?api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
      );
      return theater;
    });

    const theaterDetails = await Promise.all(theaterInfo);
    dispatch(setTheaters(theaterDetails));
  };
};

export const fetchNearbyTheaters = (lat, long) => {

  return async dispatch => {
    const { data: theaters } = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres?lat=${lat}&lng=${long}&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    dispatch(setTheaters(theaters));
  };
};

export const fetchMovies = (lat, long) => {
  return async dispatch => {
    const { data: movies } = await axios.get(
      `http://data.tmsapi.com/v1.1/movies/showings?startDate=${
        initialState.date
      }&lat=${lat}&lng=${long}&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );

    dispatch(setMovies(movies));
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
        movies: [...action.movies],
      };
    case SET_THEATERS:
      //console.log('inside reducer', action.theaters);
      return {
        ...state,
        theaters: action.theaters,
      };
    default:
      return state;
  }
};

//
// Store
//

const store = createStore(
  reducer,

  applyMiddleware(thunkMiddleware)
);

export default store;
