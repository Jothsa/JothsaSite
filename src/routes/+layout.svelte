<script lang="ts">
  import '$styles/index.css';
  import AccessibleMenu from '$components/AccessibleMenu.svelte';
  import Header from '$components/Header.svelte';
  import { page } from '$app/stores';
  import { theme, themeMode } from '$scripts/Preferences';
  import type { LayoutData } from './$types';
  import Footer from '$components/Footer.svelte';
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
  <AccessibleMenu />
  <Header />
  <slot />
  <Footer />
</div>
