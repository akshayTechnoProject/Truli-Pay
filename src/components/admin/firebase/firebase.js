// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzfktpXOKhoUM_XOpI-4i_CmtLgkkPXUQ",
  authDomain: "trulipay.firebaseapp.com",
  projectId: "trulipay",
  storageBucket: "trulipay.appspot.com",
  messagingSenderId: "326860589916",
  appId: "1:326860589916:web:c40efe282d7d8a2669cf99",
  measurementId: "G-TLW2002M2Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
