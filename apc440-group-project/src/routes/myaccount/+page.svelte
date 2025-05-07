<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { getMessagesByUser } from '$lib/services/db/contact';
	import { getOrders } from '$lib/services/db/orders';
	import type { UserData } from '$lib/services/db/user';
	import { fetchUserFromCookie } from '$lib/services/userAuth';
	import type { Timestamp } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { innerWidth } from 'svelte/reactivity/window';

	import { scale } from 'svelte/transition';

	onMount(async () => {
		user = await fetchUserFromCookie();
		console.log('User data:', user);

		if (!user) {
			goto('/login?redirect=/checkout');
		}
	});

	let user: UserData = $state(null);

	let selectedOrder = $state(null);

	function openOrderModal(order) {
		selectedOrder = order;
	}

	function closeModal() {
		selectedOrder = null;
	}

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
</script>

{#if selectedOrder}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		transition:scale={{ start: 1.1, duration: 150 }}
		class="modal-backdrop"
		onclick={closeModal}
	>
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<button class="close-button" onclick={closeModal}>×</button>

			<h2>Order #{selectedOrder.id}</h2>
			<p><strong>Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
			<p><strong>Total:</strong> {selectedOrder.total}</p>
			<p>
				<strong>Status:</strong>
				<span class="status {selectedOrder.status}">{selectedOrder.status}</span>
			</p>

			<h3 style="margin-top: 1.5rem;">Items</h3>
			<div class="items-list">
				{#each selectedOrder.items as item}
					<div class="item-card">
						<img src={item.image} alt={item.name} />
						<div class="item-details">
							<p class="item-name">{item.name}</p>
							<p class="item-meta">
								<span class="item-subtext">${item.price.toFixed(2)}</span>
								<span class="item-subtext">× {item.quantity}</span>
							</p>
							<span class="item-category {item.category}">{item.category}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<div class="account-container">
	<header class="account-header">
		<div>
			<h1>{user?.name}</h1>
			<p>{user?.email}</p>
		</div>
	</header>

	<section class="account-section">
		<h2>My Orders</h2>
		{#await getOrders(user?.id) then orders}
			<table class="account-table">
				<thead>
					<tr>
						{#if innerWidth.current > 600}
							<th>Order ID</th>
						{/if}
						<th>Date</th>
						<th>Total</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each orders as order}
						<tr onclick={() => openOrderModal(order)} class="clickable">
							{#if innerWidth.current > 600}
								<td>{order.id}</td>
							{/if}
							<td>{formatDate(order.createdAt)}</td>
							<td>{order.total}</td>
							<td class="status {order.status}">{order.status}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/await}
	</section>

	<section class="account-section">
		<h2>Messages</h2>
		{#await getMessagesByUser(user?.id) then messages}
			<table class="account-table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Subject</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each messages as message}
						<tr>
							<td>{formatDate(message.date)}</td>
							<td>{message.message}</td>
							<td class="status {message.status}">{message.status}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/await}
	</section>
</div>

<style>
	.clickable {
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.clickable:hover {
		background-color: #f5f5f5;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		max-width: 400px;
		width: 90%;
		position: relative;
	}

	.close-button {
		position: absolute;
		top: 0.5rem;
		right: 0.75rem;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #999;
	}
	/*  */
	.account-container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		font-family: 'Segoe UI', sans-serif;
		color: #333;
	}

	.account-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		border-bottom: 2px solid #eee;
		padding-bottom: 1rem;
		margin-bottom: 2rem;
	}

	.account-header h1 {
		margin: 0;
		/* color: #e91e63; */
	}

	.account-header p {
		margin: 0;
		color: #777;
	}

	.account-section {
		margin-bottom: 2rem;
	}

	.account-table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	.account-table th,
	.account-table td {
		padding: 12px;
		border: 1px solid #ddd;
		text-align: left;
	}

	.account-table th {
		background-color: #f4f4f4;
		color: #333;
	}

	.account-table tr:nth-child(even) {
		background-color: #fafafa;
	}

	.account-table tr:nth-child(odd) {
		background-color: #fff;
	}

	.account-table tr:hover {
		background-color: #f1f1f1;
	}

	.status {
		font-weight: bold;
	}

	/* Status colors */
	.status.Delivered {
		color: #4caf50;
	}
	.status.Processing {
		color: #ff9800;
	}
	.status.Shipped {
		color: #2196f3;
	}
	.status.Replied {
		color: #2196f3;
	}
	.status.Pending {
		color: #f44336;
	}

	.items-list {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.item-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem;
		border: 1px solid #eee;
		border-radius: 0.5rem;
		background-color: #fafafa;
	}

	.item-card img {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 0.5rem;
	}

	.item-details {
		display: flex;
		flex-direction: column;
	}

	.item-name {
		font-weight: 600;
		margin: 0;
	}

	.item-subtext {
		margin: 0;
		color: #777;
		font-size: 0.9rem;
	}

	.item-category {
		margin-top: 0.25rem;
		padding: 0.15rem 0.5rem;
		font-size: 0.75rem;
		border-radius: 4px;
		text-transform: uppercase;
		width: fit-content;
	}

	.item-category.cats {
		background-color: #ffecf2;
		color: #e91e63;
	}

	.item-category.dogs {
		background-color: #e8f5e9;
		color: #4caf50;
	}

	.item-category.humans {
		background-color: #e3f2fd;
		color: #2196f3;
	}
</style>
