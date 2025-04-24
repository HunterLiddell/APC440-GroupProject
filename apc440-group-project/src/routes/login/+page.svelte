<script lang="ts">
  let email = '';
  let password = '';
  let error = '';

  function login() {
    if (!email || !password) {
      error = 'Both fields are required!';
      return;
    }

    error = '';
    // Replace this with your auth logic
    alert(`Logging in as ${email}`);
  }
</script>

<div class="min-h-screen bg-pink-50 flex items-center justify-center">
  <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border-4 border-yellow-200">
    <h1 class="text-3xl font-bold text-rose-600 mb-2">Paws & Pastries</h1>
    <p class="text-yellow-800 mb-6 italic">"Whiskers, Whisks, and Warm Welcome!"</p>

    <form
      on:submit|preventDefault={login}
      class="space-y-5"
    >
      <input
        class="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Email"
        type="email"
        bind:value={email}
      />
      <input
        class="w-full p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
        placeholder="Password"
        type="password"
        bind:value={password}
      />
      {#if error}
        <p class="text-red-500 text-sm">{error}</p>
      {/if}
      <button
        class="w-full bg-yellow-300 hover:bg-yellow-400 text-pink-900 font-semibold py-3 rounded-lg transition"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</div>
