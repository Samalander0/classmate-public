<script>
  export let feature = "pro features";
  export let visible = false;
</script>

<div class={visible ? "pro-popup" : "pro-popup hidden"}>
  <div class="popup-content">
    <h2>Classmate <mark>Pro</mark></h2>
    <p>This feature is only available to our Pro members. Upgrade to Classmate Pro to access <span class="feature">{feature}</span>, unlimited essay reviews, and more.</p>
    <a class="button" href="/pro">Upgrade -></a>
  </div>
  <button class="popup-background" on:click={() => {visible = false}}></button>
</div>