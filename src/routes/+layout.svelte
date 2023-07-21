<script lang="ts">
  import '$styles/index.css';
  import Header from '$components/Header.svelte';
  import { page } from '$app/stores';
  import Preferences from '$components/Preferences.svelte';
  import { theme, themeMode } from '$scripts/Preferences';
  import type { LayoutData } from './$types';
  export let data: LayoutData;

  $: pageTitle =
    $page.data?.title !== undefined ? `Jothsa - ${$page.data.title}` : `Jothsa`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>
<div
  class={`wrapper user-prefs`}
  data-theme={$theme}
  data-theme-mode={$themeMode}
  style="display: contents;">
  <Header />
  <slot />
  <Preferences />
</div>
