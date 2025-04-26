// src/lib/firebase.ts
import { getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyANfFqzM6228J3ubkxTuUMv405_AIAg3NY",
  authDomain: "paws-and-pastries.firebaseapp.com",
  projectId: "paws-and-pastries",
  storageBucket: "paws-and-pastries.firebasestorage.app",
  messagingSenderId: "1039618119876",
  appId: "1:1039618119876:web:fb34d4c8066f268a965191"
};
/**
 * Initialize (or get) the firebase app from the session info
 * Makes sure the firebase app is only initialized once
 * Note: the session info include the public firebase configuration
 * @returns a firebase app
 */
export function initApp() {
    const apps = getApps();
    if (apps.length > 0) {
        return apps[0];
    }

    return initializeApp(firebaseConfig);
}

export let firebaseBrowserApp: FirebaseApp;
export let auth: Auth;

function initializeFirebase() {
    // Ensure Firebase is initialized before trying to getAuth
    firebaseBrowserApp = initApp();
    auth = getAuth(firebaseBrowserApp);
}

// Call this function in your app entry point (e.g., main.ts)
initializeFirebase();
