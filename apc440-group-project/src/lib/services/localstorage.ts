import type { LineItem } from "./db/cart";

const CART_KEY = 'paws-cart';

function debounce(func: Function, delay: number) {
	let timeout;
	return function (...args: any[]) {
		if(timeout) return;
		timeout = setTimeout(() => {
			func(...args);
			timeout = null;
		}, delay);
	}
}

export function getLocalstorageCart(): LineItem[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const data = localStorage.getItem(CART_KEY);
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
}

// export const localstorage = {
// 	saveCart: debounce(saveCart, 1000),
// }

export function saveCartToStorage(items: LineItem[]) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(CART_KEY, JSON.stringify(items));
}