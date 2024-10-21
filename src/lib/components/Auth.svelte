<script>
  import { currentUser, pb } from '$lib/pocketbase'
  import { KeyRound } from 'lucide-svelte';
  import { invalidateAll } from '$app/navigation';

  async function googleAuth() {
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });

    invalidateAll(); // Reload the page
    location.reload();
  }
</script>

<div class="auth">
  <h1>Sign in to continue</h1>
  <button class="button" on:click={googleAuth}><KeyRound size="16"/>Sign in with Google</button>
</div>