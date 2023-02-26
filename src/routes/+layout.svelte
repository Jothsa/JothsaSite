<script>
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '../lib/navigation.svelte';

  function toggleAnim() {
    document.body.classList.toggle('anim');
  }

  onMount(async () => {
    document.body.classList.toggle('anim');
  });
</script>

<SvelteUIProvider>
  <Nav />
  <slot />
  <Button on:click={toggleAnim}>Animate?</Button>
</SvelteUIProvider>
