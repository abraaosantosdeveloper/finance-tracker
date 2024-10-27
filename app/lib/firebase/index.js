// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWdK2uyI4jiV58K0ITyb6JYKFJNnOjj9g",
  authDomain: "finance-tracker-4230c.firebaseapp.com",
  projectId: "finance-tracker-4230c",
  storageBucket: "finance-tracker-4230c.appspot.com",
  messagingSenderId: "683323070644",
  appId: "1:683323070644:web:d8443239b9353c2b1edfe1",
  measurementId: "G-D03ZGJWE79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, app };