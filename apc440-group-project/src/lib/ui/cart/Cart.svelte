<script module>
	import { type MenuItem } from '$lib/services/db/menu-items';

	interface LineItem extends MenuItem {
		quantity: number;
	}

	class Cart {
		constructor() {}

		#open: boolean = $state(false);
		#lineItems: Map<string, LineItem> = new SvelteMap();

		/** Cart subtotal */
		subtotal: number = $derived.by(() => {
			let t = 0;
			this.#lineItems.forEach((item) => {
				t += item.price * item.quantity;
			});
			return t;
		});

		/**
		 * Number of individual items in the cart
		 */
		itemCount: number = $derived.by(() => {
			let count = 0;
			this.#lineItems.forEach((item) => (count += item.quantity));
			return count;
		});

		/** Returns list of line items */
		getLineItems = () => this.#lineItems.entries();
		/** Open the cart */
		open = () => (this.#open = true);
		/** Close the cart */
		close = () => (this.#open = false);
		/** If the cart is open or not */
		isOpen = () => this.#open;

		/** Adds a product to the cart */
		add = (product: MenuItem) => {
			// Open cart
			this.open();

			// Fetch item from map
			const lineitem = this.#lineItems.get(product.id);

			// If line item exists, increment quantity
			if (lineitem) lineitem.quantity++;
			// Otherwise add new entry
			else {
				// Declare new stated variable for reactivity within the map
				const statedItem = $state({ ...product, quantity: 1 });
				// Insert into map
				this.#lineItems.set(product.id, statedItem);
			}
		};

		/** Removes a product from the cart */
		remove = (productId: string) => this.#lineItems.delete(productId);

		/** Updates a line items quantity to the given value */
		updateQuantity = (newQuantity: number, productId: string) => {
			const lineitem = this.#lineItems.get(productId);
			// Return early if line item does not exist
			if (!lineitem) return;

			// Ensure the given quantity is within 1 and 999
			const quantity = newQuantity < 0 ? 1 : newQuantity > 999 ? 999 : newQuantity;

			// Update quantity
			lineitem.quantity = quantity;
		};
	}

	export let cart = new Cart();
</script>

<!-- Menu that overlays everything on the screen. It opens and closes in the top right of the screen.
 Opening animation starts as a small square, grows left until a certain point, then grows down until another point.
 Closing animation is the reverse of the opening. -->
<script lang="ts">
	import { X, ShoppingCart, Trash2 } from 'lucide-svelte';
	import { SvelteMap } from 'svelte/reactivity';
	import { on } from 'svelte/events';
	import { onDestroy, onMount } from 'svelte';

	let activeCloseAnimation = $state(false);

	/**
	 * Handles the close of the menu.
	 * Utilizes a timeout for the animation to finish.
	 */
	function handleClose() {
		activeCloseAnimation = true;

		// Wait n ms before closing the menu.
		// Each animation in the sequence is set to 0.2s
		// 0.2 * 3 = 600 ms
		setTimeout(() => {
			cart.close();

			activeCloseAnimation = false;
		}, 600);
	}

	onMount(() => {
		// Declare click handler on the window
		const removeClick = on(window, 'click', (e) => {
			// if the click event originates from inside the cart modal, do nothing
			if (cartElement?.contains(e.target as Node)) {
				return;
			}

			// Otherwise check if the target id is related to add-to-cart logic
			if ((e.target as HTMLElement).id != 'for-cart') {
				handleClose();
			}
		});
		// If user scrolls with the cart open, close it
		const removeScroll = on(window, 'scroll', () => {
			handleClose();
		});

		// Remove event listener
		onDestroy(() => {
			removeClick();
			removeScroll();
		});
	});

	let cartElement: HTMLElement | null = $state(null);

	function t(e: Event & { currentTarget: EventTarget & HTMLInputElement }, id: string) {
		const newQ = (e.target as HTMLInputElement).value;
		cart.updateQuantity(parseInt(newQ), id);
	}
</script>

<div
	bind:this={cartElement}
	class:close={activeCloseAnimation}
	class="drop-in-menu open"
	aria-modal="true"
	role="dialog"
>
	<div class="header">
		<ShoppingCart size={28} color="black"></ShoppingCart>
		<h1 class="text-3xl m-0">Cart</h1>
		<button aria-label="close dialog" class="close-button" onclick={handleClose}>
			<X size={24}></X>
		</button>
	</div>
	<div class="line-item-wrapper">
		{#each cart.getLineItems() as [id, item] (id)}
			<div class="line-item">
				<img src={item.image} alt={item.image + 'image'} />
				<div style="width: 100%;">
					<h3>{item.name}</h3>
					<div style="display: flex; width: 100%; gap: 12px; align-items: center;">
						<button id="for-cart" onclick={() => cart.remove(item.id)}>
							<Trash2 id="for-cart" size={24} color="red" />
						</button>
						<input
							max="999"
							type="number"
							value={item.quantity}
							onchange={(e) => t(e, item.id)}
						/>
						<span style="margin-left: auto"
							>${(item.price * item.quantity).toFixed(2)}</span
						>
					</div>
				</div>
			</div>
		{:else}
			<div
				style="background-color: rgba(0,0,0,0.05); width: 100%; height: 100%; display: flex; aligh-items: center; text-align: center;"
			>
				<p style="margin: auto; font-weight: 600">No items in your cart</p>
			</div>
		{/each}
	</div>
	<div class="footer">
		<span style="margin-left: auto; margin-top: auto;"
			>Subtotal: {cart.subtotal.toFixed(2)}</span
		>
	</div>
</div>

<style lang="postcss">
	.footer {
		padding: 12px 0 0 0;
		text-align: right;
		border-top: 1px lightgray solid;
		height: 50px;
		width: 100%;
		bottom: 0;
	}

	.line-item-wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
		overflow: auto;
		height: 100%;
	}

	.line-item {
		padding: 8px;
		display: flex;
		gap: 12px;

		& img {
			width: 100px;
			border-radius: 12px;
		}
		& input[type='number'] {
			padding: 2px;
			height: 24px;
			width: 60px;
		}
	}

	button.close-button {
		/* @apply flex ml-auto items-center rounded opacity-70 font-semibold; */
		display: flex;
		margin-left: auto;
		align-items: center;
		border-radius: 12px;
		opacity: 70%;
		font-weight: 600;
	}

	div.header {
		display: flex;
		align-items: center;
		gap: 4px;
		border-bottom: 1px solid rgb(179, 179, 179);
	}
	div.drop-in-menu {
		display: flex;
		position: fixed;
		flex-direction: column;
		z-index: 9999999;
		top: 0;
		right: 0;
		padding: 8px;
		margin: 16px 16px 0 0;
		border-radius: 12px;
		background-color: white;
		border: 1px solid rgb(179, 179, 179);
		overflow: hidden;
		height: 50px;
		width: 50px;
		max-width: 100%;

		box-shadow: -4px 4px 16px rgb(10, 10, 10);

		&.open {
			animation:
				fadeIn 0.2s ease-in-out forwards,
				growHorizontal 0.2s ease-in-out forwards,
				growVertical 0.2s ease-in-out 0.2s forwards;
		}

		&.close {
			/* Predefined width for the animation to start at during close.
            Needs to be the same as the ending height of the opening animation. */
			width: 344px;

			animation:
				shrinkVertical 0.2s ease-in-out forwards,
				shrinkHorizontal 0.2s ease-in-out 0.2s forwards,
				fadeOut 0.2s ease-in-out 0.4s forwards;
		}
	}

	@keyframes fadeIn {
		height: 50px;
		width: 50px;
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes growHorizontal {
		0% {
			width: 50px;
		}
		100% {
			width: 344px;
		}
	}

	@keyframes growVertical {
		0% {
			height: 50px;
		}

		100% {
			height: 600px;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes shrinkHorizontal {
		0% {
			width: 344px;
		}
		100% {
			width: 50px;
		}
	}

	@keyframes shrinkVertical {
		0% {
			height: 600px;
		}
		100% {
			height: 50px;
		}
	}
</style>
