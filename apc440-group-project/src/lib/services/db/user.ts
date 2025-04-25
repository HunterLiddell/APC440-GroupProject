import type { User } from "firebase/auth";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";



export async function createUserAsync(user: User, name: string) {
  const db = getFirestore();
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    displayName: name,
    email: user.email,
    createdAt: serverTimestamp(),
  }, { merge: true });
}