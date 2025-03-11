<script lang="ts">
	import { menuItems } from '$lib/services/menu-items';
	import Button from '$lib/ui/Button.svelte';
	import { CakeIcon, DogIcon, CatIcon, UserIcon } from 'lucide-svelte';
	import { fade, fly } from 'svelte/transition';
	import MenuBackground from './MenuBackground.svelte';
	import { cubicInOut } from 'svelte/easing';
	import MenuItemCard from '$lib/ui/MenuItemCard.svelte';

	/** Values to filter by */
	type FilterType = 'all' | 'cats' | 'dogs' | 'humans';

	/** Actively applied filter. Default `all`*/
	let activeFilter: FilterType = $state('all');

	/**
	 * Filtered menu items
	 *
	 * Determined by the user's filter selection. Default is all items
	 */
	let filteredItems = $derived.by(() => {
		if (activeFilter == 'cats') return menuItems.filter((item) => item.category == 'cats');
		if (activeFilter == 'dogs') return menuItems.filter((item) => item.category == 'dogs');
		if (activeFilter == 'humans') return menuItems.filter((item) => item.category == 'humans');
		return menuItems;
	});
</script>

<!-- Absolute positioned background with floating icons -->
<MenuBackground />

<!-- Title and filter options -->
<section in:fade={{ duration: 800, easing: cubicInOut }}>
	<h1>Our Pawesome Menu</h1>
	<p>
		Discover our whimsical collection of treats crafted with love by our talented furry chefs!
	</p>
	<div class="container">
		<div class="text-center"></div>
		<div class="button-group">
			<Button
				type={activeFilter === 'all' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'all')}
			>
				<CakeIcon /> All Treats
			</Button>
			<Button
				type={activeFilter === 'cats' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'cats')}
			>
				<CatIcon /> Cat Treats
			</Button>
			<Button
				type={activeFilter === 'dogs' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'dogs')}
			>
				<DogIcon /> Dog Treats
			</Button>
			<Button
				type={activeFilter === 'humans' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'humans')}
			>
				<UserIcon /> Human Treats
			</Button>
		</div>
	</div>
</section>

<!-- Line break -->
<hr />

<!-- Menu items -->
<section>
	<div in:fly={{ y: '100px', duration: 600, delay: 100 }} class="menu-grid">
		{#each filteredItems as item}
			<MenuItemCard {item} />
		{/each}
	</div>
</section>

<style lang="postcss">
	h1 {
		font-size: 32px;
		text-shadow: 0 2px 4px lightgray;
	}

	@media (min-width: 600px) {
		h1 {
			font-size: 64px !important;
		}
	}

	hr {
		width: clamp(300px, 80%, 800px);
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 20px;
	}

	p {
		max-width: 600px;
		margin: 0 auto;
		font-size: 1.125rem;
		color: #666;
	}

	.button-group {
		display: flex;
		justify-content: center;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 20px;
	}

	/* General Section Styling */
	section {
		padding: 3rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	/* Grid Layout for Menu Items */
	.menu-grid {
		display: grid;
		gap: 1.5rem;
		margin: 0 auto;

		grid-template-columns: repeat(1, 280px);
		width: max-content;
	}

	@media (min-width: 625px) {
		.menu-grid {
			grid-template-columns: repeat(2, 280px);
		}
	}

	@media (min-width: 950px) {
		.menu-grid {
			grid-template-columns: repeat(3, 280px);
		}
	}

	/* Card Styling */
	.card {
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-in-out;
		display: flex;
		flex-direction: column;

		&:hover {
			transform: translateY(-5px);
		}
	}

	/* Image Wrapper */
	.card-header {
		position: relative;
		overflow: hidden;

		& img {
			width: 100%;
			aspect-ratio: 4 / 3;
			object-fit: cover;
			transition: transform 0.3s ease-in-out;
		}

		&:hover img {
			transform: scale(1.05);
		}
	}

	.card-footer {
		display: flex;
		gap: 12px;
		margin-top: auto;
	}

	/* Card Content */
	.card-content {
		padding: 1.5rem;
		/* height: inherit; */
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-price {
		color: #ff6b6b;
		font-weight: bold;
	}

	.card-description {
		font-size: 14px;
		color: #555;
		margin-bottom: 1rem;
	}
</style>
