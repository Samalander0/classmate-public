<script>
  import { currentUser, pb } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  
  import Navbar from '$lib/components/Navbar.svelte';
  import Auth from '$lib/components/Auth.svelte';
  import Metatags from '$lib/components/Metatags.svelte';

  import '$lib/styles/pro.scss';

  onMount(async () => {
    // Update user info

    const userInfo = await pb.collection('users').getOne($currentUser.id)
    currentUser.set(userInfo)
  });

  // Method to handle the form submission
  async function handleCheckout() {
    const currentPath = window.location.pathname;
    
    // Create the checkout session by sending a POST request to the backend
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: $currentUser.email,
        path: currentPath,
        userId: $currentUser.id,
        customerId: $currentUser.stripe_customer_id
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
</script>

<Metatags title="Classmate Pro" description="Upgrade to Classmate Pro, and get unlimited essay reviews, plus more, for only $5.99/mo"/>

<Navbar/>

{#if $currentUser}
  <main class="pro-main">
    {#if $currentUser.plan == 'free'}
      <div class="pro-info">
        <h1>Upgrade to Classmate Pro</h1>
        <div class="pro-plans">
          <div class="plan-card">
            <h2>Classmate Free</h2>
            <p class="plan-info">Everything you need to start with AI-powered essay reviews for free</p>
            <a class="button button-secondary" href="/feedback">Get started for free -></a>
            <ul class="plan-features">
              <li>3 free essay reviews</li>
              <li>Both general and line-by-line essay feedback</li>
            </ul>
          </div>
          <div class="plan-card">
            <h2>Classmate Pro</h2>
            <p class="plan-info">Upgrade to pro for unlimited access and more</p>
            <button class="button" on:click={handleCheckout}>Upgrade for $5.99/mo -></button>
            <ul class="plan-features">
              <li>Unlimited essay reviews</li>
              <li>Early access to new features</li>
              <li>Access to built-in editor</li>
              <li>Support Classmate's development</li>
            </ul>
          </div>
        </div>
      </div>
    {:else}
      <div class="has-pro">
        <h2>You're using Classmate Pro</h2>
        <p>Thank you for supporting Classmate. If you have any questions or need support, email support@classmate.app</p>
        <button on:click={handlePortal} class="button">Manage subscription</button>
      </div>
    {/if}
  </main>
{:else}
  <Auth/>
{/if}