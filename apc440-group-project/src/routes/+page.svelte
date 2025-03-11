<script lang="ts">
	import Waves from '$lib/ui/Waves.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Mounted isn't always needed, but since i'm using SSR, we need it for the first page load
	let mounted = $state(false);
	onMount(() => (mounted = true));
</script>

<main>
	<section>
		<div class="flex flex-col absolute z-10 items-center justify-center h-full">
			{#if mounted}
				<h2 in:fly={{ y: '300px', duration: 1600 }}>Paws & Pastries</h2>
				<h3 in:fly={{ y: '100px', duration: 1000, delay: 800 }}>
					Where Furry Bakers Create Pawesome Treats
				</h3>
			{/if}
		</div>
		<img src="/hero3.webp" alt="Paws & Pastries Bakery" />
	</section>

	<Waves />
</main>

<style lang="postcss">
	img {
		width: 100%;
		min-width: 1200px;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 1;
		background: radial-gradient(circle, black 0%, rgba(0, 0, 0, 0.5) 50%);
	}

	section {
		position: relative;
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
		height: 600px;
		overflow: hidden;
		background-color: ghostwhite;
	}

	h2 {
		color: #ffffff;
		margin-bottom: 12px;
		font-size: 5rem;
		text-shadow: 0 0 8px black;
	}
	h3 {
		color: #ffffff;
		margin-bottom: 12px;
		font-size: 3rem;
		text-shadow: 0 0 6px black;
		text-align: center;
	}

	h2,
	h3 {
		text-align: center;
	}

	@media (max-width: 1800px) {
		h2 {
			font-size: 64px;
		}

		h3 {
			font-size: 32px;
			max-width: 400px;
		}
	}

	@media (max-width: 800px) {
		h2 {
			font-size: 40px;
		}
		h3 {
			font-size: 24px;
			max-width: 350px;
		}
	}
</style>
