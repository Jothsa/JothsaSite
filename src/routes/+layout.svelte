<script lang="ts">
  import '$styles/index.css';
  import AccessibleMenu from '$components/AccessibilityMenu.svelte';
  import Header from '$components/Header.svelte';
  import Preferences from '$components/Preferences.svelte';
  import { page } from '$app/stores';
  import Footer from '$components/Footer.svelte';
  import { description, siteTitle } from '$utils/config';
  import { onMount } from 'svelte';
  import {
    setRandomGlobalProps,
    setRandomLocalProps,
  } from '$scripts/randomStyleProps';

  const randomPalette = [
    'oklch(66.67% 0.148 238.24)',
    'oklch(72.06% 0.358 331.41)',
    'oklch(72.06% 0.069 151.41)',
    'oklch(72.06% 0.089 248.82)',
    'oklch(51.76% 0.227 262.59)',
  ];

  $: pageTitle =
    $page.data?.title !== undefined
      ? `${siteTitle} - ${$page.data.title}`
      : siteTitle;
  $: pageDescription = $page.data?.description || description;

  onMount(() => {
    setRandomGlobalProps(randomPalette, 2, 0, 1, 2);
    setRandomLocalProps(randomPalette);
  });
</script>

<svelte:head>
  <link rel="alternate" type="application/atom+xml" href="/rss.xml" />
  <!-- crossorigin is needed when preloading font files
  @link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload#cors-enabled_fetches:~:text=As%20mentioned%20above%2C%20one%20interesting%20case%20where%20this%20applies%20is%20font%20files.%20Because%20of%20various%20reasons%2C%20these%20have%20to%20be%20fetched%20using%20anonymous%2Dmode%20CORS%20(see%20Font%20fetching%20requirements).
-->
  <link
    rel="preload"
    href="/fonts/CarterOne.woff2"
    as="font"
    type="font/woff2"
    crossorigin="anonymous" />
  <meta name="description" content={pageDescription} />
  <meta name="color-scheme" content="dark light" />
  <meta name="theme-color" content="oklch(19.41% 0.123 275.29)" />
  <meta
    name="theme-color"
    content="oklch(71.3% 0.178 240.35)"
    media="(prefers-color-scheme: light)" />
  <meta name="robots" content="noindex" />
  <title>{pageTitle}</title>
</svelte:head>

<AccessibleMenu />
<Header />
<slot />
<Footer />
