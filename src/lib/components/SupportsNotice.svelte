<script lang="ts">
  import * as SupportsCSS from 'supports-css';
  import { onMount } from 'svelte';

  const tests = [
    'at-container',
    'at-property',
    'color-function',
    'color-mix',
    'container-units',
    'dynamic-viewport-units',
    'has',
    'logical-properties',
    'nesting',
    'nth-of-s',
    'view-transitions',
  ];

  onMount(() => {
    SupportsCSS.init({ tests });
    SupportsCSSTests.results.entries.forEach((r) => {
      if (r[1] === false) {
        document.getElementById('supports-menu')?.classList.add('unsupported');
      }
    });
  });
</script>

<div id="supports-menu">
  <p>
    Your browser doesn't support the latest features used on this site. To get
    the best experience, upgrade your browser.
  </p>
</div>

<noscript>
  <div id="no-js-menu">
    <p>Enable javascript for the best experience.</p>
  </div>
</noscript>

<style>
  .supports-menu {
    display: none;
  }

  .supports-menu.unsupported {
    display: block;
  }

  #no-js-menu {
    position: absolute;
    inset-block-end: 2rem;
    inset-inline-start: 2rem;
    display: block;
    inline-size: fit-content;
    block-size: fit-content;
  }
</style>
