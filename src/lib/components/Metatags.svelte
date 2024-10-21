<script>
  export let title = "Classmate";
  export let description = "Instant AI-powered essay feedback, available for all."
</script>

<svelte:head>
  <!-- Primary Meta Tags -->
  <title>
    {title}
  </title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.classmate.app/" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://www.classmate.app/meta-card.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://www.classmate.app/" />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content="https://www.classmate.app/meta-card.png" />
</svelte:head>