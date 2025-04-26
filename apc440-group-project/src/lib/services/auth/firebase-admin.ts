import { initializeApp as initializeAdminApp, applicationDefault, cert, getApps  } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { Amplify } from "aws-amplify";

// let initialized = false;

// export function initFirebaseAdmin() {
//   console.log("Initializing Firebase Admin SDK 1");
//   if (getApps().length === 0 && !initialized) {
//     const CREDS = process.env.SERVICE_ACCOUNT
//       ? JSON.parse(process.env.SERVICE_ACCOUNT)
//       : "/Users/hunterliddell/Desktop/APC440-GroupProject/apc440-group-project/src/lib/services/auth/paws-and-pastries-service-account.json";
//     console.log("Initializing Firebase Admin SDK");
//     initializeApp({
//       credential: cert(CREDS),
//     });
//     initialized = true;
//   }
// }

// export { getAuth, getFirestore };



function initAdminApp() {
    const apps = getApps();
    if (apps.length > 0) {
        return apps[0];
    }

    const CREDS = process.env.SERVICE_ACCOUNT
      ? JSON.parse(process.env.SERVICE_ACCOUNT)
      : "/Users/hunterliddell/Desktop/APC440-GroupProject/apc440-group-project/src/lib/services/auth/paws-and-pastries-service-account.json";

    const config = {
        credential: cert(CREDS),
        //databaseURL:
    };

    return initializeAdminApp(config);
}

export function getFirebaseAdminAuth() {
    return getAuth(initAdminApp());
    
}


