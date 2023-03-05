<script>
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '$lib/Navigation.svelte';
  import Controls from '$lib/Controls.svelte';
  import 'agnostic-svelte/css/common.min.css';

  function toggleAnim() {
    document.body.classList.toggle('anim');
  }

  onMount(async () => {
    document.body.classList.toggle('anim');
  });
</script>

<SvelteUIProvider>
  <Nav />
  <!-- <Controls /> -->
  <slot />
  <Button on:click={toggleAnim}>Animate?</Button>
</SvelteUIProvider>
