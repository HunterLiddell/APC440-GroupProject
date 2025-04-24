<script lang="ts">
	import { auth } from "$lib/services/auth/firebase";
	import IconBackground from "$lib/ui/IconBackground.svelte";
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

  let mode: 'login' | 'signup' = $state('login');
  let email = $state('');
  let password = $state('');
  let error = $state('');

  function setCookie() {
    fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful cookie setting
          console.log("Cookie set successfully");
        } else {
          // Handle error
          console.error("Error setting cookie");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((e) => {
        // Handle successful login
        alert(`Logged in as ${email}`);
      })
      .catch((err) => {
        // Handle error
        error = 'Invalid email or password';
      });
  }

  function createUser(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Handle successful signup
        alert(`Account created for ${email}`);
        login(email, password);
      })
      .catch((err) => {
        // Handle error
        error = 'Error creating account, error: ' + err.message;
      });
  }

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (!email || !password) {
      error = 'Please enter both fields!';
      return;
    }

    error = '';
    if (mode === 'login') {
      login(email, password);
    } else {
      createUser(email, password);
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
        <button class="underline ml-1" onclick={() => mode = 'signup'}>
          Create one
        </button>
      {:else}
        Already have an account?
        <button class="underline ml-1" onclick={() => mode = 'login'}>
          Log in
        </button>
      {/if}
    </p>
  </div>
</div>
