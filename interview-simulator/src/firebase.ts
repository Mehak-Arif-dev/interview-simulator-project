import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAhVnoo3LVvf4HoT-Tq3ZKsRF9MNeoj7zE",
  authDomain: "interview-simulator-f1a8b.firebaseapp.com",
  databaseURL: "https://interview-simulator-f1a8b-default-rtdb.firebaseio.com",
  projectId: "interview-simulator-f1a8b",
  storageBucket: "interview-simulator-f1a8b.firebasestorage.app",
  messagingSenderId: "290510588467",
  appId: "1:290510588467:web:9804b5ff57a50b9170f146",
  measurementId: "G-5XMRGG7CBP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app); // ✅ Realtime Database
