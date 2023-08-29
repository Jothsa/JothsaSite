<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    await import(/* @vite-ignore */ '/_pagefind/pagefind-ui.js?url');
    new PagefindUI({ element: '#search' });
  });
</script>

<!-- these should get added on build-- ergo this won't work on dev server -->
<link href="/_pagefind/pagefind-ui.css" rel="stylesheet" />
<!-- <script src="/_pagefind/pagefind-ui.js" type="text/javascript"></script> -->

<div id="search" />

<style>
  #search {
    --pagefind-ui-scale: 1;
    --pagefind-ui-primary: var(--contrast);
    --pagefind-ui-text: var(--text-primary);
    --pagefind-ui-background: var(--tertiary);
    --pagefind-ui-border: var(--accent);
    --pagefind-ui-tag: var(--accent);
    --pagefind-ui-border-width: 2px;
    --pagefind-ui-border-radius: 8px;
    --pagefind-ui-image-border-radius: 8px;
    --pagefind-ui-image-box-ratio: 3 / 2;
    --pagefind-ui-font: sans-serif;
  }
</style>
