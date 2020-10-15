import firebase from "firebase/app";
// Required for side-effects
import "firebase/firestore";
import "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyC8tazaX0KWDe-vww5XmRUdVKNOszz1kU4",
  authDomain: "froth-7tpiu.firebaseapp.com",
  databaseURL: "https://froth-7tpiu.firebaseio.com",
  projectId: "froth-7tpiu",
  storageBucket: "froth-7tpiu.appspot.com",
  messagingSenderId: "879140520860",
  appId: "1:879140520860:web:33ff7f2118f2844afbbe59"
};
export const firebaseApp =
  !firebase.apps.length && firebase.initializeApp(firebaseConfig);
//firebaseApp && firebaseApp.firestore().enablePersistence(false);
/*.settings({
  cacheSizeBytes: 1048576
});*/
//firebase.firestore().settings({ persistence: false });
firebaseApp &&
  firebaseApp.firestore().enablePersistence({ synchronizeTabs: true });

export default firebase;
export const auth = firebaseApp && firebaseApp.auth();
export const fireStore = firebaseApp && firebaseApp.firestore();
