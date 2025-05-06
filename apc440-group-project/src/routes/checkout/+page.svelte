<script lang="ts">
	import { page } from '$app/state';
	import type { MenuItem } from '$lib/services/db/menu-items';
	import { purchaseOrder, type Address, type Order } from '$lib/services/db/orders';
	import { cart } from '$lib/ui/cart/Cart.svelte';
	import { Timestamp } from 'firebase/firestore';

	let shippingInfo: Address = $state({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		zipCode: ''
	});
	let sameAsShipping = $state(true);

	let billingInfo: Address = $state({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		state: '',
		zipCode: ''
	});

	let paymentInfo = $state({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		nameOnCard: ''
	});

	// Error state
	let errors = $state({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		zipCode: '',
		phone: ''
	});

	// Validation patterns
	const patterns = {
		cardNumber: '^[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}$',
		expiryDate: '^(0[1-9]|1[0-2])\/([0-9]{2})$',
		cvv: '^[0-9]{3,4}$',
		zipCode: '^[0-9]{5}(-[0-9]{4})?$'
	};

	// Validation messages
	const errorMessages = {
		cardNumber: 'Please enter a valid 16-digit card number',
		expiryDate: 'Please enter a valid expiry date (MM/YY)',
		cvv: 'Please enter a valid CVV (3-4 digits)',
		zipCode: 'Please enter a valid ZIP code'
	};

	// Validation functions
	function validateField(field: string, value: string) {
		const pattern = new RegExp(patterns[field]);
		if (!pattern.test(value)) {
			errors[field] = errorMessages[field];
			return false;
		}
		errors[field] = '';
		return true;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Validate all fields
		const isCardValid = validateField('cardNumber', paymentInfo.cardNumber);
		const isExpiryValid = validateField('expiryDate', paymentInfo.expiryDate);
		const isCvvValid = validateField('cvv', paymentInfo.cvv);
		const isZipValid = validateField('zipCode', shippingInfo.zipCode);

		if (isCardValid && isExpiryValid && isCvvValid && isZipValid) {
			alert(`Order placed for ${shippingInfo.firstName} ${shippingInfo.lastName}`);
			const items: MenuItem[] = [];
			cart.getLineItems().forEach(([_, item]) => {
				items.push(item);
			});

			let order: Order = {
				shippingAddress: shippingInfo,
				billingAddress: sameAsShipping ? shippingInfo : billingInfo,
				items: items,
				createdAt: Timestamp.now(),
				id: '',
				total: cart.subtotal,
				userId: page.data.user.id
			};

			await purchaseOrder(order);
		}
	}
</script>

<div class="flex flex-col md:flex-row min-h-screen font-sans">
	<!-- Checkout Form -->
	<div class="md:w-2/3 w-full bg-white p-8">
		<div class="max-w-2xl ml-auto">
			<h2 class="text-2xl font-bold text-orange-700 mb-6">Checkout</h2>
			<form onsubmit={handleSubmit} class="space-y-8">
				<!-- Shipping Information -->
				<div class="space-y-4">
					<h3 class="text-xl font-semibold text-orange-600">Shipping Information</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label class="block font-semibold mb-1"
								>First Name
								<input
									type="text"
									bind:value={shippingInfo.firstName}
									required
									class="input"
								/>
							</label>
						</div>
						<div>
							<label class="block font-semibold mb-1"
								>Last Name
								<input
									type="text"
									bind:value={shippingInfo.lastName}
									required
									class="input"
								/>
							</label>
						</div>
						<div class="md:col-span-2">
							<label class="block font-semibold mb-1"
								>Street Address
								<input
									type="text"
									bind:value={shippingInfo.address}
									required
									class="input"
								/>
							</label>
						</div>
						<div>
							<label class="block font-semibold mb-1"
								>City
								<input
									type="text"
									bind:value={shippingInfo.city}
									required
									class="input"
								/>
							</label>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block font-semibold mb-1"
									>State
									<input
										type="text"
										bind:value={shippingInfo.state}
										required
										class="input"
									/>
								</label>
							</div>
							<div>
								<label class="block font-semibold mb-1"
									>ZIP Code
									<input
										type="text"
										bind:value={shippingInfo.zipCode}
										required
										class="input"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>

				<!-- Billing Information -->
				<div class="space-y-4">
					<h3 class="text-xl font-semibold text-orange-600">Billing Information</h3>
					<div class="mb-4">
						<label class="flex items-center space-x-2">
							<input
								type="checkbox"
								bind:checked={sameAsShipping}
								onchange={() => {
									if (sameAsShipping) {
										billingInfo = { ...billingInfo, ...shippingInfo };
									} else {
										billingInfo = { ...billingInfo };
										sameAsShipping = false;
									}
								}}
								class="rounded text-orange-600 focus:ring-orange-400"
							/>
							<span>Same as shipping address</span>
						</label>
					</div>

					{#if !sameAsShipping}
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label class="block font-semibold mb-1"
									>First Name
									<input
										type="text"
										bind:value={billingInfo.firstName}
										required
										class="input"
									/>
								</label>
							</div>
							<div>
								<label class="block font-semibold mb-1"
									>Last Name
									<input
										type="text"
										bind:value={billingInfo.lastName}
										required
										class="input"
									/>
								</label>
							</div>
							<div class="md:col-span-2">
								<label class="block font-semibold mb-1"
									>Street Address
									<input
										type="text"
										bind:value={billingInfo.address}
										required
										class="input"
									/>
								</label>
							</div>
							<div>
								<label class="block font-semibold mb-1"
									>City
									<input
										type="text"
										bind:value={billingInfo.city}
										required
										class="input"
									/>
								</label>
							</div>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="block font-semibold mb-1"
										>State
										<input
											type="text"
											bind:value={billingInfo.state}
											required
											class="input"
										/>
									</label>
								</div>
								<div>
									<label class="block font-semibold mb-1"
										>ZIP Code
										<input
											type="text"
											bind:value={billingInfo.zipCode}
											required
											class="input"
										/>
									</label>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- Payment Information -->
				<div class="space-y-4">
					<h3 class="text-xl font-semibold text-orange-600">Payment Details</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="md:col-span-2">
							<label class="block font-semibold mb-1"
								>Name on Card<input
									type="text"
									bind:value={paymentInfo.nameOnCard}
									required
									class="input"
								/></label
							>
						</div>
						<div class="md:col-span-2">
							<label class="block font-semibold mb-1"
								>Card Number<input
									id="cc"
									type="text"
									bind:value={paymentInfo.cardNumber}
									oninput={() =>
										validateField('cardNumber', paymentInfo.cardNumber)}
									pattern={patterns.cardNumber}
									maxlength="19"
									placeholder="1234 5678 9012 3456"
									required
									class="input {errors.cardNumber ? 'border-red-500' : ''}"
								/></label
							>
							{#if errors.cardNumber}
								<p class="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
							{/if}
						</div>
						<div>
							<label class="block font-semibold mb-1"
								>Expiry Date<input
									type="text"
									bind:value={paymentInfo.expiryDate}
									oninput={() =>
										validateField('expiryDate', paymentInfo.expiryDate)}
									pattern={patterns.expiryDate}
									placeholder="MM/YY"
									required
									class="input {errors.expiryDate ? 'border-red-500' : ''}"
								/></label
							>
							{#if errors.expiryDate}
								<p class="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
							{/if}
						</div>
						<div>
							<label class="block font-semibold mb-1"
								>CVV<input
									type="text"
									bind:value={paymentInfo.cvv}
									oninput={() => validateField('cvv', paymentInfo.cvv)}
									pattern={patterns.cvv}
									placeholder="123"
									required
									class="input {errors.cvv ? 'border-red-500' : ''}"
								/></label
							>
							{#if errors.cvv}
								<p class="text-red-500 text-sm mt-1">{errors.cvv}</p>
							{/if}
						</div>
					</div>
				</div>

				<button
					type="submit"
					class="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold transition"
				>
					Place Order
				</button>
			</form>
		</div>
	</div>
	<!-- Cart Summary -->
	<div class="md:w-1/2 w-full bg-orange-50 border-r border-orange-200 p-8">
		<h2 class="text-2xl font-bold text-orange-700 mb-6">Your Cart 🐾</h2>
		{#each cart.getLineItems() as [_, item]}
			<div class="flex items-center gap-4 mb-4">
				<img src={item.image} alt={item.name} class="w-16 h-16 rounded-lg object-cover" />
				<div class="flex-1">
					<p class="font-semibold">{item.name}</p>
					<p class="text-sm text-gray-600">{item.quantity} x ${item.price.toFixed(2)}</p>
				</div>
			</div>
		{/each}
		<hr class="my-4 border-orange-300" />
		<p class="text-lg font-semibold">Total: ${cart.subtotal}</p>
	</div>
</div>

<style lang="postcss">
	@reference "../../app.css";
	.input {
		@apply w-full p-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-orange-400;
	}
</style>
