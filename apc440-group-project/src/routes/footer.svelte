<!-- Global footer containing about-us, contact, hours, and newsletter @component -->
<script>
	import { MapPin, Phone, Mail } from 'lucide-svelte';
</script>

<footer>
	<div class="container">
		<div class="footer-grid">
			<section>
				<h3>About Us</h3>
				<p>
					Paws & Pastries is a unique bakery where our furry friends create delightful
					treats for both pets and their humans.
				</p>
			</section>
			<section>
				<h3>Contact</h3>
				<address class="contact-info">
					<div class="contact-item">
						<MapPin />
						<a
							onclick={(e) => {
								e.preventDefault();
								alert('I told you.. this goes no where...');
							}}
							href="/this-goes-no-where-:)">123 Pawsome Street, Bakery Town</a
						>
					</div>
					<div class="contact-item">
						<Phone size={20} />
						<a href="tel:555-123-4567">(555) 123-4567</a>
					</div>
					<div class="contact-item">
						<Mail />
						<a href="mailto:woof@pawsandpastries.com">woof@pawsandpastries.com</a>
					</div>
				</address>
			</section>
			<section>
				<h3>Hours</h3>
				<p>Monday - Friday: 7am - 7pm</p>
				<p>Saturday: 8am - 6pm</p>
				<p>Sunday: 9am - 5pm</p>
			</section>
			<section>
				<h3>Newsletter</h3>
				<p>Subscribe to get updates about our latest treats and special offers!</p>
				<form class="newsletter-form" onsubmit={() => alert('Thanks for subscribing!')}>
					<input type="email" placeholder="Enter your email" required />
					<button type="submit">Subscribe</button>
				</form>
			</section>
		</div>
		<div class="footer-bottom">&copy; 2025 Paws & Pastries. All rights reserved.</div>
	</div>
</footer>

<style lang="postcss">
	a {
		/* Default anchor-tag color is in app.css - overwriting it here */
		color: rgb(238, 204, 153) !important;
	}
	h3 {
		font-size: 24px;
	}

	footer {
		background-color: #1f1208;
		color: #ddd;
		padding: 50px 20px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: repeat(1, minmax(0, 1fr));
		gap: 20px;
	}

	@media (min-width: 650px) {
		.footer-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1250px) {
		.footer-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	section {
		padding: 10px;
	}

	.contact-info {
		font-size: 14px;
		color: #ccc;
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-bottom: 5px;
	}

	.newsletter-form {
		display: flex;
		gap: 10px;
		margin-top: 10px;
	}

	.newsletter-form input {
		width: 100%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
	}

	.newsletter-form button {
		background-color: #ff6b6b;
		color: white;
		border: none;
		padding: 8px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
	}

	.newsletter-form button:hover {
		background-color: #ff4c4c;
	}

	.footer-bottom {
		margin-top: 30px;
		text-align: center;
		font-size: 14px;
		border-top: 1px solid #444;
		padding-top: 20px;
		color: #bbb;
	}
</style>
