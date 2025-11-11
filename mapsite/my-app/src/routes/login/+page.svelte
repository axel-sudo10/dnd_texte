<script lang="ts">
  import { authWithPassword } from '$lib/pb';
  import { goto } from '$app/navigation';
  let email = 'axelhuger@gmail.com';
  let password = 'DnDIstCool';
  let error: string | null = null;
  let loading = false;

  async function submit() {
    error = null;
    loading = true;
    try {
      await authWithPassword(email, password);
      // on success go to admin page
      goto('/admin');
    } catch (e) {
      console.error('login error', e);
      error = 'Login fehlgeschlagen — bitte überprüfe Zugangsdaten oder PocketBase läuft nicht.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="max-w-md mx-auto mt-12 p-6 bg-white/90 rounded-lg shadow">
  <h2 class="text-xl font-semibold mb-4">Admin Login</h2>

  {#if error}
    <div class="text-red-700 text-sm mb-3">{error}</div>
  {/if}

  <form on:submit|preventDefault={submit}>
    <div class="mb-3">
      <label for="email" class="block text-sm font-medium">E‑Mail</label>
      <input id="email" type="email" bind:value={email} class="w-full border p-2 rounded mt-1" required />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium">Passwort</label>
      <input id="password" type="password" bind:value={password} class="w-full border p-2 rounded mt-1" required />
    </div>
    <div class="flex items-center gap-3">
      <button class="px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={loading}>
        {#if loading}
          Anmeldung...
        {:else}
          Einloggen
        {/if}
      </button>
      <a class="text-sm text-gray-600" href="/">Zurück zur Karte</a>
    </div>
  </form>

  <p class="mt-4 text-xs text-gray-500">Hinweis: Zugangsdaten sind vorbefüllt.</p>
</div>
