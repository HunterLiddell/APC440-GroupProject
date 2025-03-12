<script lang="ts">
	import { ShoppingBag } from 'lucide-svelte';
	import { innerWidth } from 'svelte/reactivity/window';
	import { fly } from 'svelte/transition';

	let isMobile: boolean = $derived((innerWidth?.current ?? 0) < 900);

	/** Controls mobile drawer visibility */
	let showDrawer: boolean = $state(false);

	const toggleDrawer = () => (showDrawer = !showDrawer);
	const closeDrawer = () => (showDrawer = false);
</script>

<header style={isMobile ? 'justify-content: space-between;' : ''}>
	<div style="position: relative; width: 100%;">
		<div class="header-content">
			{#if isMobile}
				<button
					class:active={showDrawer}
					class="mobile-drawer-button"
					onclick={toggleDrawer}
					aria-label="mobile drawer button"
				>
					<span></span>
					<span></span>
					<span></span>
				</button>
			{/if}

			{#if !isMobile}
				<!-- Logo and company name -->
				<a style="height: 100%; margin-right: 24px;" href="/">
					<img style="height: 100%; border-radius: 100%" src="./logo.webp" alt="Logo" />
				</a>
			{/if}

			<a href="/">
				<h1>Paws & Pastries</h1>
			</a>
			{#if !isMobile}
				<!-- Main navigation bar -->
				<nav>
					<a href="/menu">Menu</a>
					<a href="/meet-the-bakers">Meet the Bakers</a>
					<a href="/behind-the-scenes">Behind the Scenes</a>
				</nav>
			{/if}

			<!-- Cart button -->
			<button
				class=""
				onclick={() => {
					// Nothing for now..  Open cart here later
				}}
			>
				<ShoppingBag size={32} />
			</button>
		</div>
		{#if isMobile && showDrawer}
			<div transition:fly={{ y: '-100%' }} class="mobile-drawer">
				<nav>
					<a onclick={closeDrawer} href="/">Home</a>
					<a onclick={closeDrawer} href="/menu">Menu</a>
					<a onclick={closeDrawer} href="/meet-the-bakers">Meet the Bakers</a>
					<a onclick={closeDrawer} href="/behind-the-scenes">Behind the Scenes</a>
				</nav>
			</div>
		{/if}
	</div>
</header>

<style lang="postcss">
	header {
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 9999;
	}

	.header-content {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 16px;
		height: 6rem;
		background-color: #ffe4c4;
		color: white;
		box-shadow: 0 0 12px gray;
		z-index: 9999;
	}

	h1 {
		letter-spacing: 1px;
	}

	nav {
		margin-left: auto;
		margin-right: 12px;

		& a {
			text-wrap: nowrap;
			margin: 0 12px;
			font-weight: 600;
			font-size: large;
		}
	}

	.mobile-drawer {
		/* absolute top-20 w-full bg-white pt-6 shadow-lg */
		position: absolute;
		z-index: 1;
		top: 110px;
		padding-top: 24px;
		box-shadow: 0 0 8px;
		height: 300px;
		width: 100%;

		background: linear-gradient(120deg, #fff1d1 0%, #ffeae7 100%);

		& nav {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 8px;
			margin-top: 24px;
			width: 100%;

			& a {
				border: 1px solid rgb(114, 22, 22);
				border-radius: 12px;
				text-align: center;
				padding: 8px 0;
				width: 75%;

				&:hover {
					background-color: bisque;
				}
			}
		}
	}

	.mobile-drawer-button {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: fit-content;
		cursor: pointer;

		& span {
			background-color: rgb(145, 77, 14);
			height: 5px;
			border-radius: 32px;
			transition:
				transform 0.2s ease-in-out,
				opacity 0.2s;
		}

		& span:nth-child(1) {
			width: 28px;
			transform-origin: left center;
		}

		& span:nth-child(2) {
			width: 22px;
		}

		& span:nth-child(3) {
			width: 28px;
			transform-origin: left center;
		}

		/* Active state */
		&.active span:nth-child(1) {
			transform: rotate(45deg) translateY(-1px) translateX(0px);
		}

		&.active span:nth-child(2) {
			opacity: 0;
			/* transform: scaleY(0); */
		}

		&.active span:nth-child(3) {
			transform: rotate(-45deg) translateY(1px) translateX(0px);
		}
	}
</style>
