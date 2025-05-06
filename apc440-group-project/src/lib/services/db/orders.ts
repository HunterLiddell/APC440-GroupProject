

import type { User } from "firebase/auth";
import { collection, doc, getDoc, getFirestore, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import type { Menu } from "lucide-svelte";
import type { MenuItem } from "./menu-items";

export interface Address {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
}


export interface Order {
    items: MenuItem[];
    total: number;
    userId: string;
    billingAddress: Address;
    shippingAddress: Address;
    createdAt: Timestamp;
    id: string;
}

export const purchaseOrder = async (order: Order) => {
    const db = getFirestore();
    const orderRef = doc(collection(db, 'orders'));
    await setDoc(orderRef, order);
}
export const getOrder = async (orderId: string): Promise<Order | null> => {
    const db = getFirestore();
    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (orderDoc.exists()) {
        const data = orderDoc.data();
        return {
            id: orderId,
            items: data.items,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            total: data.total,
            userId: data.userId,
            status: data.status,
            createdAt: data.createdAt.toDate(),
        } as Order;
    } else {
        return null;
    }
}
export const getOrders = async (userId: string): Promise<Order[]> => {
    const db = getFirestore();
    const ordersRef = doc(db, 'orders', userId);
    const ordersDoc = await getDoc(ordersRef);

    if (ordersDoc.exists()) {
        const data = ordersDoc.data();
        return data.orders.map((order: any) => ({
            id: order.id,
            items: order.items,
            billingAddress: order.billingAddress,
            shippingAddress: order.shippingAddress,
            total: order.total,
            userId: order.userId,
            status: order.status,
            createdAt: order.createdAt.toDate(),
        })) as Order[];
    } else {
        return [];
    }
}