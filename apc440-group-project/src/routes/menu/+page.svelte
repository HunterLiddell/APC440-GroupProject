<script lang="ts">
	import { menuItems } from '$lib/services/menu-items';
	import Button from '$lib/ui/Button.svelte';
	import { ShoppingBagIcon, StarIcon, CakeIcon, DogIcon, CatIcon, UserIcon } from 'lucide-svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import MenuBackground from './MenuBackground.svelte';
	import Badge from '$lib/ui/Badge.svelte';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';

	type FilterType = 'all' | 'cats' | 'dogs' | 'humans';
	let activeFilter: FilterType = $state('all');

	/**
	 * Gets the color of the badge needed
	 */
	const getBadgeColor = (category: 'cats' | 'dogs' | 'humans') => {
		if (category == 'cats') return 'red';
		if (category == 'dogs') return 'blue';
		return 'green';
	};
</script>

<!-- Absolute positioned background with floating icons -->
<MenuBackground />

<section in:fade={{ duration: 800, easing: cubicInOut }}>
	<h1>Our Pawesome Menu</h1>
	<p>
		Discover our whimsical collection of treats crafted with love by our talented furry chefs!
	</p>
	<div class="container">
		<div class="text-center"></div>
		<div class="button-group">
			<Button
				class={activeFilter === 'all' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'all')}
			>
				<CakeIcon /> All Treats
			</Button>
			<Button
				class={activeFilter === 'cats' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'cats')}
			>
				<CatIcon /> Cat Treats
			</Button>
			<Button
				class={activeFilter === 'dogs' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'dogs')}
			>
				<DogIcon /> Dog Treats
			</Button>
			<Button
				class={activeFilter === 'humans' ? 'default' : 'outline'}
				onclick={() => (activeFilter = 'humans')}
			>
				<UserIcon /> Human Treats
			</Button>
		</div>
	</div>
</section>
<hr />

<section>
	<div in:fly={{ y: '100px', duration: 600, delay: 100 }} class="menu-grid">
		{#each menuItems as item, index}
			<div class="card">
				<div class="card-header">
					<img src="" alt="Delicious Treat" />
					{#if item.isPopular}
						<span class="badge badge-popular"> ⭐ Popular </span>
					{/if}
				</div>
				<div class="card-content">
					<div class="card-title">
						<span>{item.name}</span>
						<span class="card-price">${item.price}</span>
					</div>
					<p class="card-description">{item.description}</p>
					<div style="margin-top: auto;" class="card-tags">
						{#each item.tags as tag}
							<span class="badge badge-outline">{tag}</span>
						{/each}
					</div>
					<div class="card-footer">
						<Badge title={item.category} color={getBadgeColor(item.category)}></Badge>
						<Button onclick={() => {}} class="default">🛒 Add to Cart</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	h1 {
		font-size: 52px;
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
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}

	/* Card Styling */
	.card {
		background: #fff;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-in-out;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	/* Image Wrapper */
	.card-header {
		position: relative;
		overflow: hidden;
	}

	.card-header img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		transition: transform 0.3s ease-in-out;
	}

	.card:hover .card-header img {
		transform: scale(1.05);
	}

	.card-footer {
		display: flex;
		gap: 12px;
	}

	/* Badge Styles */
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: bold;
		padding: 5px 10px;
		border-radius: 8px;
	}

	.badge-popular {
		position: absolute;
		top: 10px;
		right: 10px;
		background: #ff9800;
		color: white;
	}

	.badge-outline {
		border: 2px solid #ccc;
		color: #333;
		padding: 3px 8px;
	}

	.badge-secondary {
		background: #e3f2fd;
		color: #0277bd;
	}

	/* Card Content */
	.card-content {
		padding: 1.5rem;
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

	/* Tags */
	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-bottom: 1rem;
	}
</style>
