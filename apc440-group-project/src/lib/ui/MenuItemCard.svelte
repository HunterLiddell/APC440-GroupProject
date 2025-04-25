<!-- Card built for a menu item. Contains an image, title, price,$lib/services/db/menu-items cart button.
 @component -->

<script lang="ts">
	import type { MenuItem } from '$lib/services/db/menu-items';
	import { ShoppingCart } from 'lucide-svelte';
	import Button from './Button.svelte';
	import { cart } from './cart/Cart.svelte';

	let { item }: { item: MenuItem } = $props();
</script>

<div class="card">
	<div class="card-header">
		<img src={item.image} alt="Delicious Treat" />
	</div>
	<div class="card-content">
		<div class="card-title">
			<h2>{item.name}</h2>
		</div>
		<p class="card-description">{item.description}</p>
		<div class="card-footer" style="margin-top: auto;">
			<span class="price">${item.price}</span>
			<Button id="for-cart" onclick={() => cart.add(item)}
				><ShoppingCart size={14} /> Add to Cart</Button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	p {
		max-width: 600px;
		font-size: 1.125rem;
		color: #666;
	}

	/* Card Styling */
	.card {
		background: #fff;
		border-radius: 12px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-in-out;
		display: flex;
		overflow: hidden;
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
	}

	.card-footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: auto;

		& .price {
			color: #ff6b6b;
			font-weight: bold;
			font-size: larger;
		}
	}

	/* Card Content */
	.card-content {
		padding: 0 1.5rem 1.5rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.card-description {
		font-size: 14px;
		color: #555;
		/* padding-top: auto; */
		/* margin-top: auto; */
		flex-grow: 1;
		margin-bottom: 2rem;
	}
</style>
