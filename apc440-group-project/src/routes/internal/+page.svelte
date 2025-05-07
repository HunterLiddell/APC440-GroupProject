<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { getAllActiveMessages, type ContactMessage } from '$lib/services/db/contact';
	import {
		getAllActiveOrders,
		updateMessageStatus,
		updateOrderStatus,
		type Order
	} from '$lib/services/db/orders';
	import type { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';

	// Format timestamps to human-readable strings
	function formatDate(timestamp: Timestamp) {
		console.log('Timestamp:', timestamp);
		if (!timestamp) return '';
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(timestamp.toDate());
	}

	let messageEdits = new SvelteMap();
	let orderEdits = new SvelteMap();

	let activeMessages: Map<string, ContactMessage> = new SvelteMap();
	let activeOrders: Map<String, Order> = new SvelteMap();

	onMount(async () => {
		const am = await getAllActiveMessages();
		const ao = await getAllActiveOrders();
		am.map((msg) => {
			activeMessages.set(msg.id, msg);
		});
		ao.map((order) => {
			activeOrders.set(order.id, order);
		});
	});
</script>

<div class="internal-container">
	<h1>Internal Admin Panel</h1>

	<section class="admin-section">
		<h2>All Messages</h2>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>User</th>
					<th>Subject</th>
					<th>Date</th>
					<th>Status</th>
					<th>Update</th>
				</tr>
			</thead>
			<tbody>
				{#each activeMessages as [_, msg], index}
					<tr>
						<td>{msg.id}</td>
						<td>{msg.name}</td>
						<td>{msg.message}</td>
						<td>{formatDate(msg.date)}</td>
						<td>{msg.status}</td>
						<td>
							<select bind:value={messageEdits[msg.id]}>
								<option disabled selected value="">Update status</option>
								<option value="Pending">Pending</option>
								<option value="Replied">Replied</option>
							</select>
							<button
								onclick={() => {
									updateMessageStatus(msg.id, messageEdits[msg.id]);
									activeMessages.set(msg.id, {
										...msg,
										status: messageEdits[msg.id]
									});
								}}>Save</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>

	<section class="admin-section">
		<h2>All Orders</h2>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>User</th>
					<th>Date</th>
					<th>Total</th>
					<th>Status</th>
					<th>Update</th>
				</tr>
			</thead>
			<tbody>
				{#each activeOrders as [_, order], index}
					<tr>
						<td>{order.id}</td>
						<td>{order.shippingAddress.firstName}</td>
						<td>{formatDate(order.createdAt)}</td>
						<td>{order.total}</td>
						<td>{order.status}</td>
						<td>
							<select bind:value={orderEdits[order.id]}>
								<option disabled selected value="">Update status</option>
								<option value="Processing">Processing</option>
								<option value="Shipped">Shipped</option>
								<option value="Delivered">Delivered</option>
							</select>
							<button
								onclick={() => {
									updateOrderStatus(order.id, orderEdits[order.id]);
									activeOrders.set(order.id, {
										...order,
										status: orderEdits[order.id]
									});
								}}>Save</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>

<style>
	.internal-container {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
		font-family: 'Segoe UI', sans-serif;
	}

	h1 {
		margin-bottom: 2rem;
		text-align: center;
		color: #673ab7;
	}

	h2 {
		margin-top: 2rem;
		color: #333;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}

	tr:nth-child(odd) {
		background-color: #fff;
	}

	th,
	td {
		padding: 0.75rem;
		border: 1px solid #ddd;
		text-align: left;
	}

	select {
		padding: 0.4rem;
	}

	button {
		margin-left: 0.5rem;
		padding: 0.4rem 0.8rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #45a049;
	}
</style>
