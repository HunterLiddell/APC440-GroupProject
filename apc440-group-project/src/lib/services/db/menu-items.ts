import { collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

/**
 * Menu-item type.
 *
 * Used for constructing a menu item card.
 */
export interface MenuItem {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	category: 'cats' | 'dogs' | 'humans';
}

/**
 * List of items to render on the menu page
 */
export const menuItems: MenuItem[] = [
	// Cat Treats
	{
		id: 'c1',
		name: "Whisker's Cupcakes",
		price: 4.99,
		description: 'Catnip-infused cupcakes topped with salmon mousse and silver sprinkles',
		image: '/menuitems/wonderland-cupcakes.webp',
		category: 'cats'
	},
	{
		id: 'c2',
		name: 'Purr-fect Macarons',
		price: 6.99,
		description: 'Delicate tuna-flavored macarons with catnip cream filling',
		image: '/menuitems/purrfect-macarons.webp',
		category: 'cats'
	},
	{
		id: 'c3',
		name: 'Meow-velous Cookies',
		price: 3.99,
		description: 'Mouse-shaped cookies with cheese and catnip filling',
		image: '/menuitems/mouse-cookies.webp',
		category: 'cats'
	},
	// Dog Treats
	{
		id: 'd1',
		name: 'Bark-fest Biscuits',
		price: 5.99,
		description: 'Peanut butter and bacon-flavored breakfast biscuits',
		image: '/menuitems/barkfest-biscuits.webp',
		category: 'dogs'
	},
	{
		id: 'd2',
		name: 'Puppy Pavlova',
		price: 7.99,
		description: 'Light and airy meringue nests filled with liver pâté',
		image: '/menuitems/puppy-pavlova.webp',
		category: 'dogs'
	},
	{
		id: 'd3',
		name: 'Tail-Wagging Truffles',
		price: 8.99,
		description: 'Rich chicken and cheese truffles rolled in carob powder',
		image: '/menuitems/tailwagging-truffles.webp',
		category: 'dogs'
	},
	// Human Treats
	{
		id: 'h1',
		name: 'Paw Print Cookies',
		price: 3.99,
		description: 'Chocolate chip cookies with adorable paw print designs',
		image: '/menuitems/pawprint-cookies.webp',
		category: 'humans'
	},
	{
		id: 'h2',
		name: 'Kitty Cat Cake Pops',
		price: 4.99,
		description: 'Cat-shaped vanilla cake pops with whiskers and ears',
		image: '/menuitems/cat-cakepops.webp',
		category: 'humans'
	},
	{
		id: 'h3',
		name: 'Puppy Love Latte',
		price: 5.99,
		description: 'Creamy latte with puppy face latte art and bone-shaped cookies',
		image: '/menuitems/puppylove-latte.webp',
		category: 'humans'
	}
];


export async function createMenuItemAsync(item: MenuItem) {
	return;
	console.log('Creating menu item:', item);
	const db = getFirestore();
	const menuItemsRef = collection(db, 'menu-items');
	const menuItemRef = doc(menuItemsRef, item.id);
	await setDoc(menuItemRef, {
		name: item.name,
		price: item.price,
		description: item.description,
		image: item.image,
		category: item.category,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp()
	}, { merge: true });
}

export async function getMenuItemsAsync(): Promise<MenuItem[]> {
	const db = getFirestore();
	const menuItemsRef = collection(db, 'menu-items');
	const snapshot = await getDocs(menuItemsRef);
	
	const items: MenuItem[] = [];
	snapshot.forEach((doc) => {
		const data = doc.data();
		const item: MenuItem = {
			id: doc.id,
			name: data.name,
			price: data.price,
			description: data.description,
			image: data.image,
			category: data.category
		};
		items.push(item);
	});

	return items;
}