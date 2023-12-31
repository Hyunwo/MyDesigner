import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAUWAcu7hZY_EZCilcP9j8MpUOotrW0sOA",
  authDomain: "mydesigner-d8ab7.firebaseapp.com",
  projectId: "mydesigner-d8ab7",
  storageBucket: "mydesigner-d8ab7.appspot.com",
  messagingSenderId: "26086227943",
  appId: "1:26086227943:web:81a8d93e75f6603211c742",
  measurementId: "G-EYW5RMQ0DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };