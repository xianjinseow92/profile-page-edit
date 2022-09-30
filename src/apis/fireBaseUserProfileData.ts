// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';
import { FIREBASE_USER_PROFILE_COLLECTION } from "constants/index";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCstFmK-J-gxEup5v9NLnffxaBhtGsvUyE",
  authDomain: "user-profile-data-da96c.firebaseapp.com",
  projectId: "user-profile-data-da96c",
  storageBucket: "user-profile-data-da96c.appspot.com",
  messagingSenderId: "24574059361",
  appId: "1:24574059361:web:4cdb274bf6ff87a37c1b20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage();
export const userProfilesCollectionRef = collection(db, FIREBASE_USER_PROFILE_COLLECTION);