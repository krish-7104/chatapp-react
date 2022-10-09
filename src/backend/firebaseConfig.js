import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "chatappbykrish.firebaseapp.com",
  projectId: "chatappbykrish",
  storageBucket: "chatappbykrish.appspot.com",
  messagingSenderId: "105630318729",
  appId: "1:105630318729:web:036cc91191284624070658",
  measurementId: "G-Z4PECYQZPC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
