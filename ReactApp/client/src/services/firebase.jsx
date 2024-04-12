import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDuos40Tst_Mh7NaWpJTyTZJfX1w1SQlpE",
    authDomain: "exambanking-81cef.firebaseapp.com",
    projectId: "exambanking-81cef",
    storageBucket: "exambanking-81cef.appspot.com",
    messagingSenderId: "961165515652",
    appId: "1:961165515652:web:9556df2d448db2fedc9bd1",
    measurementId: "G-GPL6WF0FZF"
};


export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);