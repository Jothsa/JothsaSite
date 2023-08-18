<script lang="ts">
  import '$styles/index.css';
  import AccessibleMenu from '$components/AccessibilityMenu.svelte';
  import Header from '$components/Header.svelte';
  import Preferences from '$components/Preferences.svelte';
  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
  import { description, siteTitle } from '$utils/config';

  $: pageTitle =
    $page.data?.title !== undefined
      ? `${siteTitle} - ${$page.data.title}`
      : siteTitle;
  $: pageDescription = $page.data?.description || description;
</script>

<svelte:head>
  <link rel="alternate" type="application/atom+xml" href="/rss.xml" />
  <meta name="description" content={pageDescription} />
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="oklch(19.41% 0.123 275.29)" />
  <meta
    name="theme-color"
    content="oklch(71.3% 0.178 240.35)"
    media="(prefers-color-scheme: light)" />
  <title>{pageTitle}</title>
</svelte:head>

<AccessibleMenu />
<Header />
<slot />
<Footer />
