import type { User } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

export interface UserData {
    token: string;
    email: string;
    name: string;
    id: string;
}


export async function createUserAsync(user: User, name: string) {
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    name: name,
    email: user.email,
    createdAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserByIdAsync(id: string): Promise<UserData | null> {
    const db = getFirestore();
    
    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        return {
            id: userDoc.id,

            ...userDoc.data(),
        } as UserData;
    }
    return null;
}