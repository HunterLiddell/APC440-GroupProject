<!-- Background component for the Menu page. Generates icons to float and animate in the background. @component -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { innerWidth } from 'svelte/reactivity/window';

	interface Paw {
		id: number;
		size: string;
		left: string;
		top: string;
		animationDuration: string;
		delay: string;
		type: string;
		rotate: string;
	}
	let pawPrints: Paw[] = $state([]);

	/**
	 * Generate N number of paws on the screen!
	 *
	 * All done at random!
	 */
	function generatePawPrints(count: number) {
		const newPaws: Paw[] = [];
		for (let i = 0; i < count; i++) {
			newPaws.push({
				id: i,
				size: `${Math.random() * 40 + 20}px`, // 20px to 60px
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				animationDuration: `${Math.random() * 8 + 5}s`, // 5s to 13s
				delay: `${Math.random() * 4}s`, // Staggered animations
				type: Math.random() > 0.5 ? 'hat' : 'dog', // Randomize type
				rotate: `${(Math.random() > 0.5 ? -1 : 1) * Math.random() * 20}deg` // -20deg to 20deg
			});
		}
		pawPrints = newPaws;
	}

	onMount(() => {
		// Generate background icons - mobile is 10 and anything else is 30
		generatePawPrints((innerWidth.current ?? 0) > 600 ? 30 : 10); // Adjust count as needed
	});
</script>

<div class="background">
	{#each pawPrints as paw, index}
		<div
			in:fade={{ delay: 10 * index }}
			class="floating-icon {paw.type}"
			style="
                width: {paw.size};
                height: {paw.size};
                left: {paw.left};
                top: {paw.top};
                animation-duration: {paw.animationDuration};
                animation-delay: {paw.delay};
                rotate: {paw.rotate}
            "
		></div>
	{/each}
</div>

<style>
	.background {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: -1;
	}

	.floating-icon {
		position: absolute;
		opacity: 0.2;
		filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
		animation: floatPaws infinite linear;
	}

	.hat {
		background: url('/bg/chef-hat.png') no-repeat center/contain;
	}

	.dog {
		background: url('/bg/dog-paw.png') no-repeat center/contain;
	}

	@keyframes floatPaws {
		0% {
			transform: translateY(0) rotate(0);
			opacity: 0.2;
		}
		50% {
			transform: translateY(-30px) rotate(10deg);
			opacity: 0.5;
		}
		100% {
			transform: translateY(0) rotate(0);
			opacity: 0.2;
		}
	}
</style>
