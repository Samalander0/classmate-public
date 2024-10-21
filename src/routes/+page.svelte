<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Metatags from '$lib/components/Metatags.svelte';
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/pocketbase';

  import { ArrowRight } from 'lucide-svelte';

  import '$lib/styles/landing.scss';

  let width = 1000;
  onMount(() => {
    width = window.innerWidth;
  })
  function recalculateWidth() {
    width = window.innerWidth;
  }
</script>

<svelte:window on:resize={recalculateWidth}/>

<Metatags/>

<main class="landing-main">
  <Navbar/>

  <div class="landing-hero">
    <div class="hero-text">
      <h1><mark>Instant</mark> AI-powered essay feedback, <mark>available for all</mark>.</h1>
      <div class="hero-cta">
        <a href="feedback" class="button">Get Started <ArrowRight size="16"/></a>
        {#if $currentUser && $currentUser.plan == "pro"}
          <p>Thanks for using <br/>Classmate Pro!</p>
        {:else}
          <p>Get feedback on any college application<br/> essay instantly for free today.</p>
        {/if}
      </div>
    </div>
    <img class="hero-mockup" src={width > 750 ? "images/mockup.png" : "images/phone-mockup.png"} alt="mockup"/>
  </div>
</main>
