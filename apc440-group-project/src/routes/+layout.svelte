<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import '../tailwind.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Cart, { cart } from '$lib/ui/cart/Cart.svelte';
	import IconBackground from '$lib/ui/IconBackground.svelte';
	import { initApp } from '$lib/services/auth/firebase';
	import { getLocalstorageCart } from '$lib/services/localstorage';
	import { getCachedCart } from '$lib/services/db/cart';
	import { fetchUserFromCookie } from '$lib/services/userAuth';

	initApp();

	let { children }: { children: Snippet } = $props();

	onMount(async () => {
		const localStorageCart = getLocalstorageCart();
		if (localStorageCart) {
			console.log('FOUND CART');
			cart.override(localStorageCart);
			return;
		}
		console.log('NO CART');
		const user = await fetchUserFromCookie();
		if (!user) return;
		const cachedCart = await getCachedCart(user.id);
		console.log('FOUND DB CART', cachedCart);
		if (cachedCart && cachedCart.items?.length > 0) cart.override(cachedCart.items);
	});
</script>

<!-- Global header -->
<Header />

<!-- Global cart -->
{#if cart.isOpen()}
	<Cart />
{/if}

<!-- All child pages under each route -->
<main>
	<!-- Absolute positioned background with floating icons -->
	<IconBackground />
	{@render children()}
</main>

<!-- Global footer -->
<Footer />

<style lang="postcss">
	main {
		/* margin-top: 6rem; */
		background: linear-gradient(120deg, #ffe6b318 0%, #ffc2b317 100%);
	}
</style>
