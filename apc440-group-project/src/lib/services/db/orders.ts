

import type { User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, Timestamp, where } from "firebase/firestore";
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
    status: string;
    id: string;
}

export const purchaseOrder = async (order: Order) => {
    const db = getFirestore();
    const orderRef = doc(collection(db, 'orders'));
    await setDoc(orderRef, order);
    console.log('Order created:', orderRef.id);

    return orderRef.id;
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
            quantity: data.quantity,
            createdAt: data.createdAt,
        } as Order;
    } else {
        return null;
    }
}
export const getOrders = async (userId: string): Promise<Order[]> => {
    const db = getFirestore();
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const orderDocs = await getDocs(q);

    if (orderDocs.empty) {
        return [];
    }

    const orders: Order[] = [];
    orderDocs.forEach((doc) => {
        const data = doc.data();
        const order: Order = {
            id: doc.id,
            items: data.items,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            total: data.total,
            userId: data.userId,
            status: data.status,
            createdAt: data.createdAt,
        };
        orders.push(order);
    });

    return orders;
}


export const getAllOrders = async (): Promise<Order[]> => {
    const db = getFirestore();
    const ordersRef = collection(db, 'orders');
    const orderDocs = await getDocs(ordersRef);

    if (orderDocs.empty) {
        return [];
    }

    const orders: Order[] = [];
    orderDocs.forEach((doc) => {
        const data = doc.data();
        const order: Order = {
            id: doc.id,
            items: data.items,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            total: data.total,
            status: data.status,
            userId: data.userId,
            createdAt: data.createdAt,
        };
        orders.push(order);
    });

    return orders;
}

export const updateMessageStatus = async (messageId: string, status: string) => {
    const db = getFirestore();
    const messageRef = doc(db, 'messages', messageId);
    await setDoc(messageRef, { status: status }, { merge: true });
}

export const getOrderById = async (orderId: string): Promise<Order | null> => {
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
    }
    return null;
}

export const getAllActiveOrders = async () => {
    const db = getFirestore();
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef);
    const orderDocs = await getDocs(q);

    if (orderDocs.empty) {
        return [];
    }

    const orders: Order[] = [];
    orderDocs.forEach((doc) => {
        const data = doc.data();
        const order: Order = {
            id: doc.id,
            items: data.items,
            billingAddress: data.billingAddress,
            shippingAddress: data.shippingAddress,
            total: data.total,
            userId: data.userId,
            status: data.status,
            createdAt: data.createdAt,
        };
        orders.push(order);
    });

    return orders;
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    const db = getFirestore();
    const orderRef = doc(db, 'orders', orderId);
    await setDoc(orderRef, { status: status }, { merge: true });
}