import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMc039S4o_DUxgt4iKjjFu5sa4NZishX0",
  authDomain: "ipbeep.firebaseapp.com",
  projectId: "ipbeep",
  storageBucket: "ipbeep.firebasestorage.app",
  messagingSenderId: "430401935725",
  appId: "1:430401935725:web:ef4af7ecbee326bb6ae264",
  measurementId: "G-1NXLCLE1EW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; 