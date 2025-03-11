<script>
	export let height = '100px'; // Allow dynamic height adjustment
	export let rotate = '0deg';
</script>

<div class="waves-container" style="height: {height}; rotate: {rotate};">
	<div class="waves"></div>
	<div class="waves second-layer"></div>
</div>

<style>
	@keyframes waveAnimation1 {
		0% {
			clip-path: polygon(
				0% 30%,
				10% 50%,
				20% 40%,
				30% 55%,
				40% 35%,
				50% 50%,
				60% 30%,
				70% 55%,
				80% 40%,
				90% 50%,
				100% 35%,
				100% 100%,
				0% 100%
			);
			transform: translateY(0px);
		}
		50% {
			clip-path: polygon(
				0% 40%,
				10% 30%,
				20% 55%,
				30% 35%,
				40% 60%,
				50% 30%,
				60% 55%,
				70% 40%,
				80% 60%,
				90% 30%,
				100% 50%,
				100% 100%,
				0% 100%
			);
			transform: translateY(-10px);
		}
		100% {
			clip-path: polygon(
				0% 30%,
				10% 50%,
				20% 40%,
				30% 55%,
				40% 35%,
				50% 50%,
				60% 30%,
				70% 55%,
				80% 40%,
				90% 50%,
				100% 35%,
				100% 100%,
				0% 100%
			);
			transform: translateY(0px);
		}
	}

	@keyframes waveAnimation2 {
		0% {
			clip-path: polygon(
				0% 35%,
				10% 55%,
				20% 45%,
				30% 60%,
				40% 40%,
				50% 55%,
				60% 35%,
				70% 60%,
				80% 45%,
				90% 55%,
				100% 40%,
				100% 100%,
				0% 100%
			);
		}
		50% {
			clip-path: polygon(
				0% 45%,
				10% 35%,
				20% 60%,
				30% 40%,
				40% 65%,
				50% 35%,
				60% 60%,
				70% 45%,
				80% 65%,
				90% 35%,
				100% 55%,
				100% 100%,
				0% 100%
			);
		}
		100% {
			clip-path: polygon(
				0% 35%,
				10% 55%,
				20% 45%,
				30% 60%,
				40% 40%,
				50% 55%,
				60% 35%,
				70% 60%,
				80% 45%,
				90% 55%,
				100% 40%,
				100% 100%,
				0% 100%
			);
		}
	}

	.waves-container {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.waves {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: bisque;
		animation: waveAnimation1 6s infinite;
	}

	.waves.second-layer {
		background-color: rgba(255, 192, 139, 0.7); /* Slightly transparent for depth */
		animation: waveAnimation2 8s infinite ease-in-out;
		animation-delay: -3s; /* Offset timing for variation */
	}
</style>
