<script lang="ts">
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '$lib/Navigation.svelte';
  import Controls from '$lib/Controls.svelte';
  import PageTransition from '$lib/PageTransition.svelte';
  import TitleTransition from '$lib/TitleTransition.svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  export let data: LayoutData;

  function randomizeColors() {
    let colors = ['oklch'];
  }

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
  <main>
    <TitleTransition pathname={data.pathname}>
      <h1>{$page.data.title}</h1>
    </TitleTransition>
    <!-- <Controls /> -->
    <PageTransition pathname={data.pathname}>
      <slot />
      <Button on:click={toggleAnim}>Animate?</Button>
    </PageTransition>
  </main>
</SvelteUIProvider>
