// Import the functions you need from the SDKs you need
import { initializeApp, getApps  } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBRp5hSzSdbMmgJRntsge9DgidBOmlKC2M',
  authDomain: 'petwalker-d43e0.firebaseapp.com',
  databaseURL: 'https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'petwalker-d43e0',
  storageBucket: 'petwalker-d43e0.appspot.com',
  messagingSenderId: '61652858778',
  appId: '1:61652858778:web:ca09898094b1563583ec23',
  measurementId: 'G-22B12MCPGC'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default firebase_app;