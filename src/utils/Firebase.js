// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGHqYsyWVX1aQ2z74cHOR5jXjlJXPc1EQ",
  authDomain: "netflixgpt-ad110.firebaseapp.com",
  projectId: "netflixgpt-ad110",
  storageBucket: "netflixgpt-ad110.firebasestorage.app",
  messagingSenderId: "583318657959",
  appId: "1:583318657959:web:24e178fc27fd57277af482",
  measurementId: "G-XP98P59VNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
