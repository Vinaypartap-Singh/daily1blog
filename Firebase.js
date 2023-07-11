import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAZWSVYXYATD0sbXBjsmUa06zOb5qaQj-Y",
  authDomain: "daily1blog.firebaseapp.com",
  projectId: "daily1blog",
  storageBucket: "daily1blog.appspot.com",
  messagingSenderId: "431064122300",
  appId: "1:431064122300:web:0040491e8a025d7b94e1b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
