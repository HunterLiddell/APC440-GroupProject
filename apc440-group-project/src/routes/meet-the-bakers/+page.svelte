<script>
	let bakers = [
		{
			name: 'Biscuit',
			role: 'Head Pastry Chef',
			bio: 'Loves kneading dough and taste-testing.',
			specialty: 'Peanut Butter Pupcakes',
			image: 'biscuit-cat.webp'
		},
		{
			name: 'Fluffy',
			role: 'Cookie Specialist',
			bio: 'Expert in catnip-infused treats.',
			specialty: 'Tuna Tarts',
			image: 'fluffy-cat.webp'
		},
		{
			name: 'Alfred',
			role: 'Dough Master',
			bio: 'Rolls out the fluffiest dough.',
			specialty: 'Almond Arffs',
			image: 'alfred-dog.webp'
		},
		{
			name: 'Pawl',
			role: 'Cake Decorator Extraordinaire',
			bio: "Crafts 'paw-sitively' stunning cakes.",
			specialty: 'Furrosted Cakes',
			image: 'pawl-dog.webp'
		}
	];
</script>

<!-- <section class="hero">
	<h1>Meet the Bakers</h1>
	<p>Get to know the talented paws behind our delicious treats!</p>
</section> -->

<div class="waves" style="rotate: 180deg;"></div>

<!-- <section class="flex flex-row items-center justify-center w-full"> -->
<div class="baker-grid">
	{#each bakers as baker}
		<div class="baker-card">
			<img src={baker.image} alt={baker.name} />
			<h2>{baker.name}</h2>
			<p><strong>{baker.role}</strong></p>
			<p>{baker.bio}</p>
			<p><em>Specialty: {baker.specialty}</em></p>
		</div>
	{/each}
</div>
<!-- </section> -->

<section class="cta">
	<a href="/menu" class="button">Visit the Bakery</a>
	<a href="/behind-the-scenes" class="button">See Them in Action</a>
</section>

<style>
	.hero {
		text-align: center;
		padding: 50px 20px;
		background-color: #ffdead;
	}

	.baker-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 400px);
		align-self: center;
		gap: 20px;
		padding: 40px;
		justify-content: center;

		@media (max-width: 1760px) {
			grid-template-columns: repeat(2, minmax(300px, 600px));
		}
		@media (max-width: 680px) {
			grid-template-columns: repeat(1, 300px);
		}
	}

	.baker-card {
		background: #fff;
		padding: 20px;
		text-align: center;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.baker-card img {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 10px;

		@media (max-width: 880px) {
			width: 225px;
			height: 225px;
		}

		@media (max-width: 600px) {
			width: 150px;
			height: 150px;
		}
	}

	.cta {
		text-align: center;
		padding: 40px;
	}

	.button {
		background: #ff914d;
		color: white;
		padding: 10px 20px;
		text-decoration: none;
		border-radius: 5px;
		margin: 10px;
		display: inline-block;
	}

	.button:hover {
		background: #d97941;
	}
</style>
