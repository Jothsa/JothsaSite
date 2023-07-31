<script lang="ts">
  import * as SupportsCSS from 'supports-css';
  import { onMount } from 'svelte';

  const tests = [
    'anchor',
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

  const unsupportedTestClassNames: string[] = [];

  tests.forEach((t) => {
    unsupportedTestClassNames.push(`.no-${t}`);
  });

  onMount(() => {
    const supportsCSSMenuEl = document.getElementById('supports-menu');
    // doesn't need to be added to test array
    SupportsCSS.addTest(
      'popover',
      HTMLElement.prototype.hasOwnProperty('popover'),
    );
    SupportsCSS.init({ tests });
    console.log(unsupportedTestClassNames.toString());
    document
      .querySelector(
        `:root:is(${unsupportedTestClassNames.toString()}) #supports-menu`,
      )
      ?.classList.add('unsupported');
  });
</script>

<div id="supports-menu">
  <p>
    Your browser doesn't support the latest features used on this site. To get
    the best experience, upgrade your browser.
  </p>
</div>


  <div id="no-js-menu">
    <p>Enable javascript for the best experience.</p>
  </div>


<style>
  #supports-menu {
    display: none;
  }

  :global(#supports-menu.unsupported) {
    display: flex;
  }
  
  #no-js-menu, #supports-menu {
    justify-content: center;
    block-size: fit-content;
    background: var(--contrast);
    color: var(--text-primary);
  }

  #no-js-menu {
    display: flex;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
</style>
