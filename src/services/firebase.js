import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBdVBoPPgtLqM5BbSMD7spaYNIx3wsQiR8",
  authDomain: "myjar-8ff23.firebaseapp.com",
  projectId: "myjar-8ff23",
  storageBucket: "myjar-8ff23.appspot.com",
  messagingSenderId: "1048416122659",
  appId: "1:1048416122659:web:532de068caf23a9aa3be96",
  measurementId: "G-0QPE1H5W77"
});

export const auth = app.auth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
