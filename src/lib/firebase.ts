// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-awsCpb6OvHY42seyunumnmJt4rgOJ2Q",
  authDomain: "summarist-ab14c.firebaseapp.com",
  projectId: "summarist-ab14c",
  storageBucket: "summarist-ab14c.firebasestorage.app",
  messagingSenderId: "905721880804",
  appId: "1:905721880804:web:79d0c01b98e2051a448cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
