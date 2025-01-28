<script>
  import { currentUser, pb } from '$lib/pocketbase'

  function logout() {
    pb.authStore.clear();
  }
</script>

<div class="footer" role="contentinfo">
  <a class="logo" href="../">
    <img src="../logo.svg" alt="classmate logo"/>
    <h2>Classmate</h2>
  </a>

  <div class="footer-right">
    {#if $currentUser}
      {#if !$currentUser.plan == "pro"}
        <a href="/pro">Classmate Pro</a>
      {/if}
      <button on:click={logout}>Log out</button>
      <a href="/feedback">Get Feedback</a>
    {:else}
      <a href="/pro">Pricing</a>
      <a href="/auth">Sign in</a>
      <a href="/auth">Sign up</a>
    {/if}
  </div>
</div>