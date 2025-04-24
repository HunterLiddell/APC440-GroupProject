// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyANfFqzM6228J3ubkxTuUMv405_AIAg3NY",
  authDomain: "paws-and-pastries.firebaseapp.com",
  projectId: "paws-and-pastries",
  storageBucket: "paws-and-pastries.firebasestorage.app",
  messagingSenderId: "1039618119876",
  appId: "1:1039618119876:web:fb34d4c8066f268a965191"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
