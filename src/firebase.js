
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBG62tRW-qO-MuXLLUaJqOeVbrS8bmQMts",
  authDomain: "chatapp-7989d.firebaseapp.com",
  projectId: "chatapp-7989d",
  storageBucket: "chatapp-7989d.appspot.com",
  messagingSenderId: "165356794218",
  appId: "1:165356794218:web:1985b94b89fb92e59b7513"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();