<script lang="ts">
	import { goto } from '$app/navigation';
	import { setSessionCookie } from '$lib/services/auth/cookies';
	import { auth } from '$lib/services/auth/firebase';
	import { getCachedCart } from '$lib/services/db/cart';
	import { createUserAsync } from '$lib/services/db/user';
	import { cart } from '$lib/ui/cart/Cart.svelte';
	import IconBackground from '$lib/ui/IconBackground.svelte';
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

	let mode: 'login' | 'signup' = $state('login');
	let email = $state('');
	let password = $state('');
	let error = $state('');
	let name = $state('');

	function login(email: string, password: string) {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (e) => {
				// Handle successful login
				const token = await e.user.getIdToken();
				await setSessionCookie(token);

				const cachedCart = await getCachedCart(e.user.uid);
				if (cachedCart && cachedCart.items?.length > 0) cart.override(cachedCart.items);

				const params = new URLSearchParams(window.location.search);
				const redirect = params.get('redirect');
				if (redirect) {
					goto(redirect);
				} else {
					goto('/');
				}
			})
			.catch((err) => {
				console.error(err);
				// Handle error
				error = 'Invalid email or password';
			});
	}

	async function createUser(email: string, password: string, name: string) {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (e) => {
				// Handle successful signup
				login(email, password);
				await createUserAsync(e.user, name);
			})
			.catch((err) => {
				// Handle error
				error = 'Error creating account, error: ' + err.message;
			});
	}

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!email || !password) {
			error = 'Please enter all fields!';
			return;
		}

		if (mode == 'signup' && !name) {
			error = 'Please enter a name!';
			return;
		}

		error = '';
		if (mode === 'login') {
			login(email, password);
		} else {
			createUser(email, password, name);
		}
	}
</script>

<IconBackground />
<div class="min-h-screen flex items-center justify-center px-4">
	<div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border-2 border-amber-800">
		<h1 class="text-3xl font-bold text-rose-600 text-center mb-1">Paws & Pastries</h1>
		<p class="text-center text-yellow-800 italic mb-6">
			{mode === 'login' ? '"Fresh treats. Furry bakers."' : '"One step closer to treats!"'}
		</p>

		<form class="space-y-5" onsubmit={submit}>
			{#if mode === 'signup'}
				<input
					type="text"
					bind:value={name}
					placeholder="Name"
					class="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
				/>
			{/if}
			<input
				type="email"
				bind:value={email}
				placeholder="Email"
				class="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
			/>
			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				class="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
			/>
			{#if error}
				<p class="text-red-500 text-sm">{error}</p>
			{/if}
			<button
				type="submit"
				class="w-full bg-rose-500 text-white py-3 rounded-lg font-semibold hover:bg-rose-600 transition"
			>
				{mode === 'login' ? 'Log In' : 'Create Account'}
			</button>
		</form>

		<p class="text-xs text-center text-pink-600 mt-6">
			{#if mode === 'login'}
				Don’t have an account?
				<button class="underline ml-1" onclick={() => (mode = 'signup')}>
					Create one
				</button>
			{:else}
				Already have an account?
				<button class="underline ml-1" onclick={() => (mode = 'login')}> Log in </button>
			{/if}
		</p>
	</div>
</div>
