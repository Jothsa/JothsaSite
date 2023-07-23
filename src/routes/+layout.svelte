<script lang="ts">
  import '$styles/index.css';
  import Header from '$components/Header.svelte';
  import { page } from '$app/stores';
  import Preferences from '$components/Preferences.svelte';
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
  <div id="accessible-menu">
    <ol>
      <li><a href="#content" class="sr-only">Skip to content</a></li>
      <li><a href="#footer" class="sr-only">Skip to footer</a></li>
    </ol>
  </div>
  <Header />
  <slot />
  <Preferences />
  <Footer />
</div>
