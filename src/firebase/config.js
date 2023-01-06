// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAsO5EmINAdDSw0ZBpYM8Riu9KBz6pd5I",
  authDomain: "journalapp-f853e.firebaseapp.com",
  projectId: "journalapp-f853e",
  storageBucket: "journalapp-f853e.appspot.com",
  messagingSenderId: "193216921008",
  appId: "1:193216921008:web:9786c0bf129cfcfb87aa75"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);