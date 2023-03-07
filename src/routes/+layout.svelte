<script lang="ts">
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '$lib/Navigation.svelte';
  import Controls from '$lib/Controls.svelte';
  import PageTransition from '$lib/PageTransition.svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  export let data: LayoutData;

  function toggleAnim() {
    document.body.classList.toggle('anim');
  }

  onMount(async () => {
    document.body.classList.toggle('anim');
  });
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>
<SvelteUIProvider>
  <Nav />
  <!-- TODO add transition for header -->
  <header><h1>{$page.data.title}</h1></header>
  <!-- <Controls /> -->
  <PageTransition pathname={data.pathname}>
    <slot />
    <Button on:click={toggleAnim}>Animate?</Button>
  </PageTransition>
</SvelteUIProvider>
