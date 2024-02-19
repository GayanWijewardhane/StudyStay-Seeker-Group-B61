// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "studystay-seeker.firebaseapp.com",
  projectId: "studystay-seeker",
  storageBucket: "studystay-seeker.appspot.com",
  messagingSenderId: "479177157374",
  appId: "1:479177157374:web:8cd9169e02a63e99f093af"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);