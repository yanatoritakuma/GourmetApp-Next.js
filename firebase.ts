// import * as firebase from "firebase/app";
// import "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// const firebaseApp = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// });

// export const db = firebaseApp.firestore();
// export const auth = firebase.auth();



// import firebase from 'firebase';
// import "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";

// const env = process.env;

// export const firebaseConfig = {
//     apiKey: env.REACT_APP_API_KEY,
//     authDomain: env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: env.REACT_APP_DATABASE_URL,
//     projectId: env.REACT_APP_PROJECT_ID,
//     storageBucket: env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: env.REACT_APP_APP_ID,
//     measurementId: env.REACT_APP_MEASUREMENT_ID,
// };

// export const firebaseApp = firebase.initializeApp(firebaseConfig);

// export const db = firebaseApp.firestore();
// export const auth = firebase.auth();


// export default firebase;


import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import "firebase/auth";


const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
