<script lang="ts">
	import { page } from '$app/state';
	import { sendMessage } from '$lib/services/db/contact';
	import Button from '$lib/ui/Button.svelte';
	import { Timestamp } from 'firebase/firestore';
	import { Mail, MapPin, Phone } from 'lucide-svelte';

	let name = $state(page.data?.user?.name || '');
	let email = $state(page.data?.user?.email || '');
	let message = $state('');

	/**
	 * Submits the form
	 */
	async function submitForm(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		e.preventDefault();

		await sendMessage({
			name: name,
			email: email,
			message: message,
			status: 'Pending',
			userId: page.data?.user?.id,
			date: Timestamp.now()
		});
	}

	// List of FAQs
	const faqs = [
		{
			question: 'Do you make custom cakes for pets?',
			answer: 'Yes! We create personalized cakes for dogs and cats. Just send us your request at least 48 hours in advance.'
		},
		{
			question: 'Are your treats safe for all pets?',
			answer: 'Absolutely! Our recipes are crafted with pet-friendly ingredients, free of artificial preservatives.'
		},
		{
			question: 'Do you offer delivery?',
			answer: 'Yes, we deliver within a 10-mile radius. You can also order online for pickup!'
		},
		{
			question: 'Can I place an order online?',
			answer: 'Yes! Visit our online store to browse our menu and place an order.'
		}
	];
</script>

<!-- Hero Section -->
<section class="hero">
	<h1>Contact Paws & Pastries</h1>
	<p>
		Have a question, special order, or just want to say hello? Send us a message, and we’ll get
		back to you as soon as possible!
	</p>
	<hr />
</section>

<!-- Contact Form -->
<section class="contact-form">
	<h2>Get in Touch</h2>
	<form onsubmit={(e) => submitForm(e)}>
		<label for="name"><h3>Name:</h3></label>
		<input
			type="text"
			id="name"
			bind:value={name}
			class:disabled={page.data?.user != null}
			disabled={page.data?.user != null}
			required
		/>

		<label for="email"><h3>Email:</h3></label>
		<input
			type="email"
			id="email"
			bind:value={email}
			class:disabled={page.data?.user != null}
			disabled={page.data?.user != null}
			required
		/>

		<label for="message"><h3>Message:</h3></label>
		<textarea id="message" bind:value={message} rows="4" required></textarea>

		<Button onclick={() => {}} type="default">Send Message</Button>
	</form>
</section>
<!-- Business Info -->
<section class="contact-info">
	<h2>Our Bakery</h2>
	<address class="contact-items">
		<div class="contact-item">
			<MapPin class="icon" />
			<a
				onclick={(e) => {
					e.preventDefault();
					alert('I told you.. this goes no where...');
				}}
				href="/this-goes-no-where-:)"
			>
				123 Pawsome Street, Bakery Town
			</a>
		</div>
		<div class="contact-item">
			<Phone class="icon" size={20} />
			<a href="tel:555-123-4567">(555) 123-4567</a>
		</div>
		<div class="contact-item">
			<Mail class="icon" />
			<a href="mailto:woof@pawsandpastries.com">woof@pawsandpastries.com</a>
		</div>
	</address>
</section>

<!-- Google Map Embed -->
<section class="map">
	<iframe
		title="Not a real location"
		src="https://maps-cdn.site123.com/include/globalMapDisplay.php?q=1103 Rose Street, La Crosse, WI, USA&z=15&l=en&ilfc="
		width="100%"
		height="300"
		style="border:0;"
		allowfullscreen
		loading="lazy"
	>
	</iframe>
</section>

<!-- FAQ Section -->
<section class="faq">
	<h2>Frequently Asked Questions</h2>
	{#each faqs as faq}
		<div class="faq-item">
			<h3>{faq.question}</h3>
			<p>{faq.answer}</p>
		</div>
	{/each}
</section>

<style lang="postcss">
	h1,
	h2 {
		text-align: center;
	}

	h3 {
		margin: 0;
	}

	p {
		max-width: 600px;
		margin: 0 auto;
		font-size: 1.125rem;
		color: #666;
	}

	/* Hero Section */
	.hero {
		text-align: center;
		padding: 40px 20px;
		font-size: 1.5rem;
		font-weight: bold;
	}

	.disabled {
		background-color: #f1f1f1;
	}

	/* Contact Form */
	.contact-form {
		max-width: 600px;
		margin: 40px auto;
		padding: 20px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

		& h2 {
			text-align: center;
			margin-bottom: 20px;
		}
		& label {
			font-weight: bold;
			display: block;
			margin-top: 10px;
		}
	}

	.contact-form input,
	.contact-form textarea {
		/* width: 90%; */
		width: 100%;
		flex-grow: 1;
		padding: 5px 0 5px 5px;
		margin-top: 5px;
		margin-right: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
	}

	/* Contact Info */
	.contact-info {
		text-align: center;
		padding: 30px;
		background: #fff;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		max-width: 500px;
		margin: 40px auto;
	}

	.contact-items {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin-top: 20px;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		justify-content: center;

		& a {
			text-decoration: none;
			font-size: 1.1rem;
			color: #333;
			transition: color 0.3s;

			&:hover {
				color: #ff8c00;
			}
		}
	}

	/* Google Map */
	.map {
		padding: 20px;
		text-align: center;
		& iframe {
			width: 100%;
			border-radius: 10px;
		}
	}

	/* FAQ Section */
	.faq {
		max-width: 700px;
		margin: 40px auto;
		padding: 20px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

		& h2 {
			text-align: center;
		}
	}

	.faq-item {
		border-bottom: 1px solid #ddd;
		padding: 10px 0;

		&:last-child {
			border-bottom: none;
		}

		& h3 {
			font-size: 1.2rem;
			margin-bottom: 5px;
			color: #ff8c00;
		}
	}

	/* Responsive */
	@media (max-width: 600px) {
		.contact-form,
		.faq {
			width: 90%;
		}
	}
</style>
