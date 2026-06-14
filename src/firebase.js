import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCbmbV9NRS15lNC7vVZE9weTvbVWJXNuwc",
  authDomain: "kinoman-3775e.firebaseapp.com",
  projectId: "kinoman-3775e",
  storageBucket: "kinoman-3775e.firebasestorage.app",
  messagingSenderId: "564373181359",
  appId: "1:564373181359:web:d2a89e51aa00a72f38555a"
};

// Init app
const app = initializeApp(firebaseConfig);

// Auth service
export const auth = getAuth(app);



// Register
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = () => {
  return signOut(auth);
};