<script>
	import { MapPin, Phone } from 'lucide-svelte';
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
				<div class="contact-info">
					<div class="contact-item">
						<MapPin />
						<span>123 Pawsome Street, Bakery Town</span>
					</div>
					<div class="contact-item">
						<Phone size={20} />
						<span>(555) 123-4567</span>
					</div>
					<div class="contact-item">
						<span class="icon">✉️</span>
						<span>woof@pawsandpastries.com</span>
					</div>
				</div>
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
	h3 {
		font-size: 24px;
	}
	body {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
		background-color: #f8f9fa;
		color: #333;
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

	.footer-section h3 {
		font-size: 18px;
		margin-bottom: 10px;
		color: #fff;
	}

	.footer-section p {
		font-size: 14px;
		color: #ccc;
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

	.icon {
		font-size: 16px;
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
