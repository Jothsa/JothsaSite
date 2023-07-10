<script lang="ts">
  import '$styles/index.css';
  import Header from '$components/Header.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Preferences from '$components/Preferences.svelte';
  import {
    theme,
    themeMode,
    isReducedMotion,
    funLevel,
  } from '$scripts/Preferences';
  import type { LayoutData } from './$types';
  export let data: LayoutData;

  import cssBlankPseudoInit from 'css-blank-pseudo';
  onMount(async () => {
    cssBlankPseudoInit();
  });
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>
<div
  class={`wrapper ${$theme} ${$themeMode} fun-${$funLevel}`}
  class:reduceMotion={$isReducedMotion}
  style="display: contents;">
  <Header />
  <slot />
  <Preferences />
</div>
