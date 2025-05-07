import { collection, doc, getDocs, getFirestore, query, setDoc, Timestamp, where } from "firebase/firestore";

export interface ContactMessage {
    id?: string;
  name: string;
  email: string;
  date: Timestamp;
  message: string;
  status: "Pending" | "Replied";
  userId: string;
}

export async function sendMessage(message: ContactMessage) {
    const db = getFirestore();

    const messageRef = doc(collection(db, 'messages'));
    await setDoc(messageRef, message);
}


export async function getMessagesByUser(userId: string) {
    const db = getFirestore();
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, where('userId', '==', userId));

    const snapshot = await getDocs(q);

    const messages: ContactMessage[] = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        const message: ContactMessage = {
            name: data.name,
            email: data.email,
            date: data.date,
            status: data.status,
            userId: data.userId,
            message: data.message,
            id: doc.id,
        };
        messages.push(message);
    });

    return messages;
}


export async function getAllActiveMessages() {
    const db = getFirestore();
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef);

    const snapshot = await getDocs(q);

    const messages: ContactMessage[] = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        const message: ContactMessage = {
            name: data.name,
            email: data.email,
            date: data.date,
            status: data.status,
            userId: data.userId,
            message: data.message,
            id: doc.id,
        };
        messages.push(message);
    });

    return messages;
}