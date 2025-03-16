<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/ui/Button.svelte';
	import Waves from '$lib/ui/Waves.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// Mounted isn't always needed, but since i'm using SSR, we need it for the first page load
	let mounted = $state(false);
	onMount(() => (mounted = true));

	let menuCtaItems = [
		{ title: 'Dogs', image: '/landingpage/dog-menu-cta.webp' },
		{ title: 'Cats', image: '/landingpage/cat-menu-cta.webp' },
		{ title: 'Humans', image: '/landingpage/human-menu-cta.webp' }
	];
</script>

<section class="hero">
	<!-- Hero with CTA -->
	<div class="flex flex-col absolute z-10 items-center justify-center h-full">
		{#if mounted}
			<h2 in:fly={{ y: '300px', duration: 800 }}>Paws & Pastries</h2>
			<h3 in:fly={{ y: '100px', duration: 500, delay: 300 }}>
				Where Furry Bakers Create Pawesome Treats
			</h3>

			<div class="hero-cta">
				<Button href="/menu">See Menu</Button>
				<Button href="/meet-the-bakers">Meet our Bakers</Button>
			</div>
		{/if}
	</div>
	<img src="/hero5.webp" alt="Paws & Pastries Bakery" />
</section>

<Waves rotate="180deg" />

<section class="menu-cta">
	<h2>Our Products</h2>
	<p class="menu-cta-message">
		For over 25 years, Paws & Pastries has been serving up tail-wagging treats and purr-worthy
		pastries—made from scratch, in small batches, and with the finest ingredients. Our bakery is
		where whiskers meet warm ovens, and every bite is crafted with love for pets and their
		people alike.
	</p>

	<br />

	<div class="menu-item-wrapper">
		{#each menuCtaItems as item}
			{@const filter = item.title.toLowerCase()}
			<div class="menu-cta-item">
				<a href={`/menu?filter=${filter}`} class="image-wrapper">
					<img src={item.image} alt={item.title + ' menu'} />
				</a>
				<p>{item.title}</p>
			</div>
		{/each}
	</div>
</section>

<style lang="postcss">
	.hero img {
		width: 100%;
		min-width: 1200px;
		height: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 1;
		opacity: 0.5;
	}

	.hero-cta {
		display: flex;
		gap: 16px;
	}

	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-items: center;
		flex-direction: column;
		height: 600px;
		overflow: hidden;
		background-color: rgb(79, 69, 45);
		background: radial-gradient(circle, black 0%, rgba(0, 0, 0, 0.7) 90%);
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

	.menu-cta h2 {
		text-shadow: 0 5px 2px lightgray;
		color: #b66a37;
	}

	.menu-cta-message {
		width: 90%;
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
		font-size: large;
	}

	.menu-item-wrapper {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		justify-content: center;

		& .menu-cta-item {
			display: flex;
			flex-direction: column;

			& p {
				padding: 0 12px;
				font-size: large;
				font-weight: 600;
			}

			& .image-wrapper {
				width: 350px;
				height: 275px;
				overflow: hidden;
				border-radius: 12px;

				& img {
					width: 100%;
					transition: all 0.3s ease-in-out;
					filter: grayscale(50%);

					&:hover {
						scale: 1.1;
						filter: grayscale(0);
					}
				}
			}
		}
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
		.menu-cta {
			font-size: small;
		}
	}
</style>
