<script>
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import Nav from '../lib/navigation.svelte';
</script>

<SvelteUIProvider>
  <Nav />
  <slot />
</SvelteUIProvider>
