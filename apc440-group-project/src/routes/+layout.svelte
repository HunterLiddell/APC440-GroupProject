<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import '../tailwind.css';
	import Footer from './footer.svelte';
	import Header from './header.svelte';
	import Cart, { cart } from '$lib/ui/cart/Cart.svelte';

	let { children }: { children: Snippet } = $props();

	$inspect(cart.isOpen());
</script>

<!-- Global header -->
<Header />

{#if cart.isOpen()}
	<Cart />
{/if}

<!-- All child pages under each route -->
<main>
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
