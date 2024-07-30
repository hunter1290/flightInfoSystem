// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPJYNs1MIhaJVuln2kDcRs6tdU_-6VwSE",
  authDomain: "indigohacktohire.firebaseapp.com",
  projectId: "indigohacktohire",
  storageBucket: "indigohacktohire.appspot.com",
  messagingSenderId: "175513505017",
  appId: "1:175513505017:web:f3faa6deff2d1d536da628",
  measurementId: "G-KR3BV8GSJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();
 export {auth,provider,signInWithPopup};