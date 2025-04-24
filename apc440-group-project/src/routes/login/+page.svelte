<script lang="ts">
	import IconBackground from "$lib/ui/IconBackground.svelte";

  let mode: 'login' | 'signup' = 'login';
  let email = '';
  let password = '';
  let error = '';

  function submit() {
    if (!email || !password) {
      error = 'Please enter both fields!';
      return;
    }

    error = '';
    if (mode === 'login') {
      alert(`Logging in as ${email}`);
    } else {
      alert(`Creating account for ${email}`);
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

    <form class="space-y-5" on:submit|preventDefault={submit}>
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
        <button class="underline ml-1" on:click={() => mode = 'signup'}>
          Create one
        </button>
      {:else}
        Already have an account?
        <button class="underline ml-1" on:click={() => mode = 'login'}>
          Log in
        </button>
      {/if}
    </p>
  </div>
</div>
