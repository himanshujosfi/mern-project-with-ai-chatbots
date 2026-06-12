import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhz9uPiZEz9GnJ1VUg_Hb6j5yg0WJkHfM",
  authDomain: "myproject-6a1a9.firebaseapp.com",
  projectId: "myproject-6a1a9",
  storageBucket: "myproject-6a1a9.firebasestorage.app",
  messagingSenderId: "769812377332",
  appId: "1:769812377332:web:b5f4995c264e021912f8a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
