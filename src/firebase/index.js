import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDASrTzVRRqiSk1tnLhkjS2iN2AQvFjAMc',
  authDomain: 'eventpal-40e2c.firebaseapp.com',
  databaseURL: 'https://eventpal-40e2c.firebaseio.com',
  projectId: 'eventpal-40e2c',
  storageBucket: 'eventpal-40e2c.appspot.com',
  messagingSenderId: '963629551224',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;
