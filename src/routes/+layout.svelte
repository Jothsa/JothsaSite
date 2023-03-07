<script lang="ts">
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '$lib/Navigation.svelte';
  import Controls from '$lib/Controls.svelte';
  import PageTransition from '$lib/PageTransition.svelte';
  import type { LayoutData } from './$types';
  export let data: LayoutData;

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
  <PageTransition pathname={data.pathname}>
    <slot />
    <Button on:click={toggleAnim}>Animate?</Button>
  </PageTransition>
</SvelteUIProvider>
