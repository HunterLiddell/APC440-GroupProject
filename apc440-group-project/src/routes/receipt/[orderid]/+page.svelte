<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getOrderById, type Order } from '$lib/services/db/orders';
	import type { UserData } from '$lib/services/db/user';
	import { onMount } from 'svelte';

	onMount(async () => {
		const orderId = page.url.pathname.split('/')[2];
		console.log('Order ID:', orderId);

		// Fetch the order details from the database using the orderId
		const orderById = await getOrderById(orderId);

		if (!orderById) {
			goto('/myaccount');
		}
		order = orderById;
	});

	let order: Order = $state();
	let user: UserData = page.data.user;

	function formatDate(timestamp) {
		console.log('Timestamp:', timestamp);
		if (!timestamp) return '';
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format();
	}
</script>

<div class="receipt-container">
	<h1>Order Receipt</h1>

	<div class="summary">
		<p><strong>Order ID:</strong> {order?.id}</p>
		<p><strong>Date:</strong> {formatDate(order?.createdAt)}</p>
		<p><strong>Status:</strong> <span class="status {order?.status}">{order?.status}</span></p>
		<p><strong>Email:</strong> {user.email}</p>
	</div>

	<table class="receipt-table">
		<thead>
			<tr>
				<th>Item</th>
				<th>Price</th>
				<th>Qty</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each order?.items as item}
				<tr>
					<td>{item.name}</td>
					<td>${item.price.toFixed(2)}</td>
					<td>{item.quantity}</td>
					<td>${(item.price * item.quantity).toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3"><strong>Grand Total</strong></td>
				<td>{order?.total}</td>
			</tr>
		</tfoot>
	</table>

	<p class="footer">Thank you for your order, {user.name}! 🐾</p>
</div>

<style>
	.receipt-container {
		max-width: 600px;
		height: 800px;
		margin: 0 auto;
		padding: 2rem;
		background: #fff;
		border: 1px solid #eee;
		border-radius: 10px;
		font-family: 'Segoe UI', sans-serif;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	h1 {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.summary p {
		margin: 0.25rem 0;
	}

	.receipt-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1.5rem;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 0.75rem;
		text-align: left;
	}

	tfoot td {
		font-weight: bold;
		background: #fafafa;
	}

	.status.Processing {
		color: orange;
	}

	.status.Delivered {
		color: green;
	}

	.footer {
		margin-top: 2rem;
		text-align: center;
		color: #555;
		font-style: italic;
	}
</style>
