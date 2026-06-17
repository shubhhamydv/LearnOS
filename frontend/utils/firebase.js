// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "learnos-86c72.firebaseapp.com",
  projectId: "learnos-86c72",
  storageBucket: "learnos-86c72.firebasestorage.app",
  messagingSenderId: "414156896490",
  appId: "1:414156896490:web:bc34c32d967b1379137f93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth,provider}