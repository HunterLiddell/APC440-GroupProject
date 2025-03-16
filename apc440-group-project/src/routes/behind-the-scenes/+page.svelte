<script>
	import Waves from '$lib/ui/Waves.svelte';

	const steps = [
		{
			img: '/behind-the-scenes/whiskers-at-work.webp',
			title: 'Whiskers at Work',
			desc: 'Our feline bakers carefully measure and mix only the finest ingredients.'
		},
		{
			img: '/behind-the-scenes/tail-wagging-tests.webp',
			title: 'Tail-Wagging Taste Tests',
			desc: 'Every batch goes through a serious taste test before baking.'
		},
		{
			img: '/behind-the-scenes/fresh-out-oven.webp',
			title: 'Fresh Out of the Oven',
			desc: 'Golden-brown biscuits and pastries fill the bakery with delightful aromas.'
		},
		{
			img: '/behind-the-scenes/final-tests.webp',
			title: 'The Finishing Touch',
			desc: 'Our decorators add the final flourishes, from frosting to paw-print sprinkles.'
		}
	];
	const galleryImages = [
		'/behind-the-scenes/kitchen1.webp',
		'/behind-the-scenes/kitchen2.webp',
		'/behind-the-scenes/kitchen3.webp',
		'/behind-the-scenes/kitchen4.webp'
	];
</script>

<Waves rotate="180deg" />
<!-- Hero Section -->
<section class="hero">
	<h1 class="hero-text">Welcome to the cozy kitchen of Paws & Pastries!</h1>
	<img src="/behind-the-scenes/hero.webp" alt="Behind the scenes bakery" />
</section>

<h2>Behind the Scenes</h2>
<p>
	Behind every treat is a dedicated team of paws hard at work, mixing, baking, and taste-testing
	to perfection. Take a peek behind the scenes!
</p>

<!-- Step-by-Step Process -->
<section class="process">
	{#each steps as step}
		<div class="step">
			<img src={step.img} alt={step.title} />
			<h3>{step.title}</h3>
			<p>{step.desc}</p>
		</div>
	{/each}
</section>

<!-- Section break with 2 waves -->
<Waves />
<Waves rotate="180deg" />

<!-- Image Gallery -->
<h2>Inside the Kitchen</h2>
<p class="section-desc">
	Our bakery is always buzzing with activity, from dough-kneading to frosting the final details.
	Take a closer look at the moments that bring Paws & Pastries to life!
</p>
<section class="gallery">
	{#each galleryImages as img}
		<img src={img} alt="Behind the scenes" />
	{/each}
</section>

<!-- Recipe -->
<section class="recipe">
	<h2>Make Your Own Peanut Butter Dog Biscuits!</h2>
	<h3>Ingredients:</h3>
	<ul>
		<li>1 cup oat flour</li>
		<li>½ cup peanut butter</li>
		<li>1 egg</li>
		<li>¼ cup unsweetened applesauce</li>
	</ul>

	<h3>Instructions:</h3>
	<ol>
		<li>Mix all ingredients.</li>
		<li>Roll dough & cut shapes.</li>
		<li>Bake at 350°F for 15 min.</li>
		<li>Let cool & serve!</li>
	</ol>
</section>

<style>
	h1,
	h2 {
		text-align: center;
	}
	h2 {
		font-size: 34px;
	}

	h3 {
		font-size: 28px;
	}

	/* Hero Section Styles */
	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 60vh;
		overflow: hidden;
	}

	.hero-text {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		font-size: 4rem;
		font-weight: bold;
	}

	.hero img {
		width: 100%;
		height: 100%;
		border-radius: 12px;
		object-fit: cover;
	}

	@media (max-width: 1000px) {
		.hero-text {
			font-size: 3rem;
		}
	}
	@media (max-width: 800px) {
		.hero {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
			height: auto;
		}
	}

	p {
		max-width: 800px;
		margin: 0 auto;
		text-align: center;
	}

	/* Step-by-Step Process Styles */
	.process {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 20px;
		padding: 40px;
		text-align: center;
	}

	.step {
		padding: 20px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.step img {
		width: 100%;
		height: 250px;
		object-fit: cover;
		border-radius: 12px;
		margin-bottom: 10px;
	}

	/* Gallery Styles */
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 10px;
		padding: 20px;
	}

	.gallery img {
		width: 100%;
		border-radius: 10px;
		object-fit: cover;
	}

	/* Recipe card styles */
	.recipe {
		background: #fff8e1;
		padding: 40px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		max-width: 700px;
		margin: 40px auto;
		text-align: center;
	}

	.recipe h2 {
		font-size: 2rem;
		margin-bottom: 10px;
		color: #d2691e;
	}

	.recipe h3 {
		font-size: 1.5rem;
		margin-top: 20px;
		color: #a0522d;
	}

	.recipe ul,
	.recipe ol {
		text-align: left;
		padding: 0 20px;
	}

	.recipe ul li,
	.recipe ol li {
		font-size: 1.2rem;
		margin: 10px 0;
		padding-left: 10px;
		position: relative;
	}

	.recipe ul li::before {
		/* Found a cookie emoji and decided to place it before each ingredient */
		content: '🍪';
		position: absolute;
		left: -25px;
	}
</style>
