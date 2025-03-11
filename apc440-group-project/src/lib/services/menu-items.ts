export type MenuItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	category: 'cats' | 'dogs' | 'humans';
};

export const menuItems: MenuItem[] = [
	// Cat Treats
	{
		id: 'c1',
		name: "Whisker's Wonderland Cupcakes",
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
		name: 'Meow-velous Mouse Cookies',
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
