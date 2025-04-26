import { initializeApp, applicationDefault, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const CREDS = process.env.SERVICE_ACCOUNT
  ? JSON.parse(process.env.SERVICE_ACCOUNT)
  : "/Users/hunterliddell/Desktop/APC440-GroupProject/apc440-group-project/src/lib/services/auth/paws-and-pastries-service-account.json";


// Only initialize once (important for dev server hot reload)
if (getApps().length === 0) {
  initializeApp({
    credential: cert(CREDS)
    // credential: cert("/Users/hunterliddell/Desktop/APC440-GroupProject/apc440-group-project/src/lib/services/auth/paws-and-pastries-service-account.json"),
  });
}

export { getAuth, getFirestore };

