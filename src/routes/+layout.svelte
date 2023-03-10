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
  import { browser } from '$app/environment';
  export let data: LayoutData;
  import { Fractils, localStorageStore } from 'fractils';
  import { anim } from '$lib/stores/anim';

  function randomizeColors() {
    let colors = ['oklch'];
  }

  function toggleAnim() {
    $anim = !$anim;
    if (anim) {
      localStorage.setItem('anim', 'true');
    } else {
      localStorage.setItem('anim', 'false');
    }
    setAnimClass();
  }

  function setAnimClass() {
    console.log('anim: ' + anim);
    if (anim) {
      document.body.classList.add('anim');
      localStorage.setItem('anim', 'true');
      console.log('added anim');
    } else {
      document.body.classList.remove('anim');
      console.log('removed anim');
    }
  }

  onMount(async () => {
    if (browser) {
      console.log('checking motion and prefs for anim');
      if (window.matchMedia('prefers-reduced-motion: reduced')) {
        $anim = false;
      } else {
        $anim = true;
      }
      if (localStorage.getItem('anim') === 'true') {
        $anim = true;
      } else if (localStorage.getItem('anim') === 'false') {
        $anim = false;
      }
      setAnimClass();
    }
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
