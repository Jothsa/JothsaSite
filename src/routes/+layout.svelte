<script lang="ts">
  import '$styles/index.css';
  import AccessibleMenu from '$components/AccessibleMenu.svelte';
  import Header from '$components/Header.svelte';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import Footer from '$components/Footer.svelte';
  // import SupportsNotice from '$components/SupportsNotice.svelte';
  export let data: LayoutData;

  $: pageTitle =
    $page.data?.title !== undefined ? `Jothsa - ${$page.data.title}` : `Jothsa`;
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<AccessibleMenu />
<Header />
<!-- <SupportsNotice /> -->
<slot />
<Footer />
