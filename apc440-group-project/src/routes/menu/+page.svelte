<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { CakeIcon, DogIcon, CatIcon, UserIcon } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	type FilterType = 'all' | 'cats' | 'dogs' | 'humans';
	let activeFilter: FilterType = $state('all');

	$inspect(activeFilter);
</script>

<section class="menu-section" in:fade>
	<h1>Our Pawesome Menu</h1>
	<p>
		Discover our whimsical collection of treats crafted with love by our talented furry chefs!
	</p>
	<!-- <div class="menu-bg"></div> -->
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

<style>
	h1 {
		font-size: 52px;
	}

	.menu-section {
		position: relative;
		padding: 50px 20px;
		text-align: center;
	}

	.menu-bg {
		position: absolute;
		inset: 0;
		/* z-index: -1; */
		/* background: radial-gradient(circle at center, rgba(255, 107, 107, 0.2) 0%, transparent 65%); */
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
</style>
