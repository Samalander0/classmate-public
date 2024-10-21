<script>
  import { currentUser, pb } from '$lib/pocketbase'
  import { onMount } from 'svelte';

  import { Menu, X } from 'lucide-svelte'

  let menu_open = false;

  function logout() {
    pb.authStore.clear();
  }

  async function handlePortal() {
    const currentPath = window.location.pathname;
    
    // Create the checkout session by sending a POST request to the backend
    const response = await fetch('/api/create-customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: $currentUser.email,
        path: currentPath,
        customerId: $currentUser.stripe_customer_id,
        userId: $currentUser.id
      })
    });
    
    if (response.ok) {
      const { url } = await response.json();
      // Redirect user to Stripe Checkout page
      window.location.href = url;
    } else {
      console.error('Failed to create checkout session');
    }
  }

  let width;
  onMount(() => {
    width = window.innerWidth;
  })
  function recalculateWidth() {
    width = window.innerWidth;
  }
</script>

<svelte:window on:resize={recalculateWidth}/>

<nav class="navbar">
  <a class="logo" href="../">
    <img src="../logo.svg" alt="classmate logo"/>
    <h2>Classmate</h2>
  </a>
  <div class="links">
    {#if width < 620}
      <button on:click={() => {menu_open = !menu_open}}>
        {#if menu_open}
          <X size="24"/>
        {:else}
          <Menu size="24"/>
        {/if}
      </button>
      <div class={menu_open ? "mobile-links" : "mobile-links hidden"}>
        {#if $currentUser}
          {#if $currentUser.plan == "pro"}
            <button on:click={handlePortal}>Manage subscription</button>
          {:else}
            <a href="/pro">Classmate Pro</a>
          {/if}
          <button on:click={logout}>Log out</button>
          <a href="/feedback">Get Feedback</a>
        {:else}
          <a href="/feedback">Sign in</a>
          <a href="/feedback">Sign up</a>
        {/if}
      </div>
    {:else}
      {#if $currentUser}
        <button on:click={logout}>Log out</button>
        {#if $currentUser.plan == "pro"}
          <button on:click={handlePortal}>Manage subscription</button>
        {:else}
          <a href="/pro">Classmate Pro</a>
        {/if}
        <a href="/feedback" class="button">Get Feedback</a>
      {:else}
        <a href="/feedback">Get Feedback</a>
        <a href="/feedback">Sign in</a>
        <a href="/feedback" class="button">Sign up</a>
      {/if}
    {/if}
  </div>
</nav>