import {  doc, getDoc, getFirestore, setDoc, Timestamp } from "firebase/firestore"
import type { MenuItem } from "./menu-items";
export interface LineItem extends MenuItem {
		quantity: number;
	}

export interface CachedCart {
    items: LineItem[];
    userId: string;
    lastUpdated: Timestamp;
}

export const getCachedCart = async (userId: string): Promise<CachedCart | null> => {
    const db = getFirestore();
    const cartRef = doc(db, "carts", userId);
    const cartSnapshot = await getDoc(cartRef);

    if(!cartSnapshot.exists) return null;

    const cartData = cartSnapshot.data() as CachedCart;

    return {
        items: cartData.items,
        userId: cartData.userId,
        lastUpdated: cartData.lastUpdated,
    }
}

export const updateCachedCart = async (userId: string, items: LineItem[]) => {
    const db = getFirestore();
    const cartRef = doc(db, "carts", userId);
    const cartData: CachedCart = {
        items,
        userId,
        lastUpdated: Timestamp.now(),
    };

    await setDoc(cartRef, cartData);
}