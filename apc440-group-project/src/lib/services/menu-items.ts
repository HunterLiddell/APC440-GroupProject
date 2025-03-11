type MenuItem = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	category: 'cats' | 'dogs' | 'humans';
	tags: string[];
	isPopular?: boolean;
};

export const menuItems: MenuItem[] = [
	// Cat Treats
	{
		id: 'c1',
		name: "Whisker's Wonderland Cupcakes",
		price: 4.99,
		description: 'Catnip-infused cupcakes topped with salmon mousse and silver sprinkles',
		image: '$assets/ui-placeholder.png',
		category: 'cats',
		tags: ['catnip', 'fish'],
		isPopular: true
	},
	{
		id: 'c2',
		name: 'Purr-fect Macarons',
		price: 6.99,
		description: 'Delicate tuna-flavored macarons with catnip cream filling',
		image: '$assets/ui-placeholder.png',
		category: 'cats',
		tags: ['fish', 'catnip']
	},
	{
		id: 'c3',
		name: 'Meow-velous Mouse Cookies',
		price: 3.99,
		description: 'Mouse-shaped cookies with cheese and catnip filling',
		image: '$assets/ui-placeholder.png',
		category: 'cats',
		tags: ['cheese', 'catnip']
	},
	// Dog Treats
	{
		id: 'd1',
		name: 'Bark-fest Biscuits',
		price: 5.99,
		description: 'Peanut butter and bacon-flavored breakfast biscuits',
		image: '$assets/ui-placeholder.png',
		category: 'dogs',
		tags: ['peanut butter', 'bacon'],
		isPopular: true
	},
	{
		id: 'd2',
		name: 'Puppy Pavlova',
		price: 7.99,
		description: 'Light and airy meringue nests filled with liver pâté',
		image: '$assets/ui-placeholder.png',
		category: 'dogs',
		tags: ['liver', 'meringue']
	},
	{
		id: 'd3',
		name: 'Tail-Wagging Truffles',
		price: 8.99,
		description: 'Rich chicken and cheese truffles rolled in carob powder',
		image: '$assets/ui-placeholder.png',
		category: 'dogs',
		tags: ['chicken', 'cheese']
	},
	// Human Treats
	{
		id: 'h1',
		name: 'Paw Print Cookies',
		price: 3.99,
		description: 'Chocolate chip cookies with adorable paw print designs',
		image: '$assets/ui-placeholder.png',
		category: 'humans',
		tags: ['chocolate', 'cookies'],
		isPopular: true
	},
	{
		id: 'h2',
		name: 'Kitty Cat Cake Pops',
		price: 4.99,
		description: 'Cat-shaped vanilla cake pops with whiskers and ears',
		image: '$assets/ui-placeholder.png',
		category: 'humans',
		tags: ['vanilla', 'cake']
	},
	{
		id: 'h3',
		name: 'Puppy Love Latte',
		price: 5.99,
		description: 'Creamy latte with puppy face latte art and bone-shaped cookies',
		image: '$assets/ui-placeholder.png',
		category: 'humans',
		tags: ['coffee', 'cookies']
	}
];
