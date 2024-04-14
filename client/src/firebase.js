// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-38c45.firebaseapp.com",
  projectId: "mern-blog-38c45",
  storageBucket: "mern-blog-38c45.appspot.com",
  messagingSenderId: "400906582284",
  appId: "1:400906582284:web:16eedaea8faa5c2b107129"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);