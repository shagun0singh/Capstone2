import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCVjlw7FChn_5WF4w5rJ1sSn9NdbHULZY",
  authDomain: "hydration-tracker-4345.firebaseapp.com",
  projectId: "hydration-tracker-4345",
  storageBucket: "hydration-tracker-4345.appspot.com",
  messagingSenderId: "467872649434",
  appId: "1:467872649434:web:bd6834f1b09cdfc85155e3",
  measurementId: "G-EQYPTKBJ1E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 