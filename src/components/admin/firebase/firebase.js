// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjqChuUFDjUBe-7rfXGx5W-vG-bhEEY4E",
  authDomain: "travel-app-8495d.firebaseapp.com",
  projectId: "travel-app-8495d",
  storageBucket: "travel-app-8495d.appspot.com",
  messagingSenderId: "397413145576",
  appId: "1:397413145576:web:d2fe74f0af77b9e68a625d",
  measurementId: "G-EG9NYJWF11",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
