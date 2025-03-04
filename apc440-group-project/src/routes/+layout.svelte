<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ShoppingBag } from 'lucide-svelte';
	import '../app.css';
	import '../waves.css';
	import '../tailwind.css';

	let { children }: { children: Snippet } = $props();
</script>

<header>
	<a style="height: 100%;" href="/">
		<img style="height: 100%; border-radius: 100%" src="./logo.webp" alt="Logo" />
	</a>
	<h1>Paws & Pastries</h1>

	<nav>
		<a href="/menu">Menu</a>
		<a href="/meet-the-bakers">Meet the Bakers</a>
		<a href="/behind-the-scenes">Behind the Scenes</a>
	</nav>
	<button
		class="mr-4"
		onclick={() => {
			// Nothing for now..  Open cart here later
		}}
	>
		<ShoppingBag size={32} />
	</button>
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; 2025 Paws & Pastries Bakery - All Rights Reserved</p>
</footer>

<style lang="postcss">
	h1 {
		letter-spacing: 1px;
		margin-left: 32px;
	}

	header {
		position: fixed;
		box-sizing: border-box;
		width: 100%;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		padding: 10px;
		height: 6rem;
		background-color: bisque;
		color: white;
		box-shadow: 0 0 12px gray;
		z-index: 9999;
	}

	main {
		margin-top: 6rem;
	}

	nav {
		margin-left: auto;
		margin-right: 12px;

		& a {
			margin: 0 12px;
		}
	}

	footer {
		padding: 20px;
		background-color: #ff914d;
		color: white;
	}
</style>
