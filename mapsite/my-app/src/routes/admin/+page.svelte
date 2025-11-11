<script lang="ts">
  import { onMount } from 'svelte';
  import { pb, logout } from '$lib/pb';
  import { goto } from '$app/navigation';
  let ready = false;

  onMount(() => {
    // if no valid session, redirect to login
    if (!pb.authStore.isValid) {
      goto('/login');
      return;
    }
    ready = true;
  });

  function doLogout() {
    logout();
    goto('/');
  }
</script>

<svelte:head>
  <title>Admin</title>
</svelte:head>

{#if ready}
  <div class="p-4">
    <div class="flex items-center justify-between mb-3">
      <div>
        <strong>Angemeldet als</strong>
        <div class="text-sm">{pb.authStore.model?.email ?? pb.authStore.model?.username}</div>
      </div>
      <div>
        <button class="px-3 py-1 bg-gray-600 text-white rounded" on:click={doLogout}>Abmelden</button>
      </div>
    </div>

    <iframe title="PocketBase admin UI" src="http://127.0.0.1:8090/_/" class="w-full h-[80vh] border rounded-xl"></iframe>
  </div>
{/if}
