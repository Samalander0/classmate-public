<script>
  import '$lib/styles/global.scss';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  
  inject({ mode: dev ? 'development' : 'production' });
</script>

<slot></slot>