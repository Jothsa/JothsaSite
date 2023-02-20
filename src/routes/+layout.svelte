<script>
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider>
  <slot />
</SvelteUIProvider>
