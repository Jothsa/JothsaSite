<script lang="ts">
  import '../app.postcss';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import { Button } from '@svelteuidev/core';
  import { onMount } from 'svelte';
  import Nav from '$lib/Components/Navigation.svelte';
  import Controls from '$lib/Components/Controls.svelte';
  import PageTransition from '$lib/Components/PageTransition.svelte';
  import TitleTransition from '$lib/Components/TitleTransition.svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  export let data: LayoutData;
  import { anim } from '$lib/stores/anim';

  function randomizeColors() {
    let colors = ['oklch'];
  }

  function setAnim(value: 'true' | 'false' | 'reduced') {
    $anim = value;
    localStorage.setItem('anim', value);
    setBodyAnimClass();
  }

  // ! dev ONLY UNTIL I MAKE PROPER CONTROLS
  //  DOESN'T DO ANYTHING IF REDUCED MOTION SET
  function toggleAnim() {
    if ($anim === 'true') {
      setAnim('false');
    } else if ($anim === 'false') {
      setAnim('true');
    }
  }

  function setBodyAnimClass() {
    console.log('anim: ' + $anim);
    if ($anim === 'true') {
      document.body.classList.add('anim');
      localStorage.setItem('anim', 'true');
      console.log('added anim');
    } else if ($anim === 'false') {
      document.body.classList.remove('anim');
      console.log('removed anim');
    } else if ($anim === 'reduced') {
      document.body.classList.add('anim');
      document.body.classList.add('animReduce');
      console.log('added anim and animReduce');
    }
  }

  onMount(async () => {
    if (browser) {
      console.log('checking motion and prefs for anim');
      if (
        window.matchMedia('prefers-reduced-motion: reduced') &&
        !localStorage.getItem('anim')
      ) {
        $anim = 'reduced';
      } else {
        $anim = 'true';
      }
      if (localStorage.getItem('anim') === 'true') {
        $anim = 'true';
      } else if (localStorage.getItem('anim') === 'false') {
        $anim = 'false';
      } else if (localStorage.getItem('anim') === 'reduced') {
        $anim = 'reduced';
      }
      setBodyAnimClass();
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
