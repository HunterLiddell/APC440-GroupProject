import { initializeApp as initializeAdminApp, cert, getApps  } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function initAdminApp() {
    const apps = getApps();
    if (apps.length > 0) {
        return apps[0];
    }

    const CREDS = process.env.SERVICE_ACCOUNT
      ? JSON.parse(process.env.SERVICE_ACCOUNT)
      : "/Users/hunterliddell/Desktop/APC440-GroupProject/apc440-group-project/src/lib/services/auth/paws-and-pastries-service-account.json";

    const config = {
        credential: cert(CREDS)
    };

    return initializeAdminApp(config);
}

export function getFirebaseAdminAuth() {
    return getAuth(initAdminApp());
    
}


