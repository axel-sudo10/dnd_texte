<script lang="ts">
  import { onMount } from 'svelte';
  import { pb, getCurrentUser, authWithPassword, logout } from '$lib/pb';
  import { writable } from 'svelte/store';

  let email = '';
  let password = '';
  const message = writable('');
  const error = writable('');
  const loggedIn = writable(false);

  onMount(() => {
    loggedIn.set(!!getCurrentUser());
  });

  async function handleLogin(e: Event) {
    e.preventDefault();
    error.set('');
    message.set('');
    try {
      await authWithPassword(email, password);
      message.set('Erfolgreich eingeloggt');
      loggedIn.set(true);
    } catch (err) {
      console.error(err);
      error.set('Login fehlgeschlagen — überprüfe E‑Mail und Passwort');
    }
  }

  function handleLogout() {
    logout();
    loggedIn.set(false);
    message.set('Abgemeldet');
  }
</script>

<form class="max-w-md p-4 bg-white/80 rounded-lg" on:submit|preventDefault={handleLogin}>
  <h3 class="text-lg font-semibold mb-2">PocketBase Login</h3>

  {#if $error}
    <div class="text-sm text-red-600 mb-2">{$error}</div>
  {/if}
  {#if $message}
    <div class="text-sm text-green-700 mb-2">{$message}</div>
  {/if}

  {#if !$loggedIn}
    <div class="mb-2">
      <label for="pb-email" class="block text-sm">E‑Mail</label>
      <input id="pb-email" class="w-full border p-2 rounded" type="email" bind:value={email} required />
    </div>
    <div class="mb-2">
      <label for="pb-password" class="block text-sm">Passwort</label>
      <input id="pb-password" class="w-full border p-2 rounded" type="password" bind:value={password} required />
    </div>
    <div class="flex gap-2">
      <button class="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Einloggen</button>
    </div>
  {:else}
    <div class="mb-2">
      <div class="text-sm">Angemeldet als: <strong>{pb.authStore.model?.email ?? pb.authStore.model?.username}</strong></div>
    </div>
    <div class="flex gap-2">
      <button class="px-4 py-2 bg-gray-600 text-white rounded" type="button" on:click={handleLogout}>Abmelden</button>
    </div>
  {/if}

  {#if $loggedIn}
    <div class="mt-4">
      <h4 class="text-sm font-medium mb-2">PocketBase Admin UI</h4>
  <!-- Admin UI iframe (local dev) -->
  <iframe title="PocketBase admin UI" src="http://127.0.0.1:8090/_/" class="w-full h-[60vh] border rounded-xl"></iframe>
    </div>
  {/if}
</form>

<style>
  /* minimal local styles; project may use Tailwind */
  form { box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
</style>
