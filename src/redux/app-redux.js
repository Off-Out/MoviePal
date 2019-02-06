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
  singleTheaterMovies: [],
  userID: null,
  zipCode: null,
  favoriteAnimal: 'dog',
  selectedMovie: [],
};

//
// Action Creators
//
const SET_GEOLOCATION = 'SET_GEOLOCATION';
const SET_MOVIES = 'SET_MOVIES';
const SET_THEATERS = 'SET_THEATERS';
const SET_ZIPCODE = 'SET_ZIPCODE';
const SET_SINGLETHEATERMOVIES = 'SET_SINGLETHEATERMOVIES';
const SELECT_MOVIE = 'SELECT_MOVIE';

//
// Action Creators
//

export const selectMovie = movie => {
  return { type: SELECT_MOVIE, movie };
};
export const setGeoLocation = location => {
  return { type: SET_GEOLOCATION, location };
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

export const setSingleTheaterMovies = movies => {
  return {
    type: SET_SINGLETHEATERMOVIES,
    movies,
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
      try {
        const { data: theater } = await axios.get(
          `http://data.tmsapi.com/v1.1/theatres/${id}?api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
        );
        return theater;
      } catch (error) {
        console.error(error);
      }
    });

    const theaterDetails = await Promise.all(theaterInfo);
    dispatch(setTheaters(theaterDetails));
  };
};

export const fetchNearbyTheaters = (lat, long) => {
  return async dispatch => {
    try {
      const { data: theaters } = await axios.get(
        `http://data.tmsapi.com/v1.1/theatres?lat=${lat}&lng=${long}&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
      );
      dispatch(setTheaters(theaters));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleTheaterMovies = (theaterId, date) => {
  return async dispatch => {
    console.log('inside of thunk');
    const { data: movies } = await axios.get(
      `http://data.tmsapi.com/v1.1/theatres/${theaterId}/showings?startDate=${date}&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
    );
    dispatch(setSingleTheaterMovies(movies));
  };
};

export const fetchMovies = (lat, long) => {
  return async dispatch => {
    try {
      const { data: movies } = await axios.get(
        `http://data.tmsapi.com/v1.1/movies/showings?startDate=${
          initialState.date
        }&lat=${lat}&lng=${long}&imageSize=Sm&api_key=w8xkqtbg6vf3aj5vdxmc4zjj`
      );
      dispatch(setMovies(movies));
    } catch (error) {
      console.error(error);
    }
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
      return {
        ...state,
        theaters: action.theaters,
      };
    case SET_SINGLETHEATERMOVIES:
      return {
        ...state,
        singleTheaterMovies: action.movies,
      };
    case SELECT_MOVIE:
      let selectedMovie = state.movies.filter(
        movie => movie.tmsId === action.movie.tmsId
      );
      return { ...state, selectedMovie: selectedMovie };

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
