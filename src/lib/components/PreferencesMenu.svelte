<script lang="ts">
  import Preferences from './Preferences.svelte';

  let isExpanded = false;

  function onPrefButtonClick(e: Event) {
    isExpanded = !isExpanded;
  }
</script>

<div class="preference-menu-container">
  <button
    aria-controls="preferences"
    aria-expanded={isExpanded}
    popovertarget="preferences"
    on:click={onPrefButtonClick}
    class="icon-only-button"
    ><svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      ><g fill="none" fill-rule="evenodd"
        ><path
          d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
          fill="currentColor"
          d="M16 15c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2h9.17A3.001 3.001 0 0 1 16 15Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2ZM8 9a3 3 0 0 1 2.762 1.828l.067.172H20a1 1 0 0 1 .117 1.993L20 13h-9.17a3.001 3.001 0 0 1-5.592.172L5.17 13H4a1 1 0 0 1-.117-1.993L4 11h1.17A3.001 3.001 0 0 1 8 9Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2Zm8-8c1.306 0 2.418.835 2.83 2H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1 0-2h9.17A3.001 3.001 0 0 1 16 3Zm0 2a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z" /></g
      ></svg
    ></button>

  <div
    class="preferences-wrapper"
    class:expanded={isExpanded}
    id="preferences"
    popover>
    <Preferences />
  </div>
</div>

<style>
  .preference-menu-container {
    position: relative;

    /* container: preferences-menu / inline-size; */
  }

  button {
    --color: var(--accent);
    --size-mod: 1ch + 0.5lvi;
  }

  .preferences-wrapper {
    /* display: block; */
    inline-size: fit-content;
    block-size: fit-content;
    border: none;
    border-radius: 1ch;
    background: var(--secondary);

    /* opacity: 0; */
    outline: solid var(--accent) 2px;
    transition:
      transform 300ms,
      opacity 300ms;

    @media (prefers-reduced-motion: no-preference) {
      /* transform: translate(200%); */
    }

    &.expanded {
      opacity: 1;

      /* transform: translate(0%); */
    }

    /*
     * [2] - at large zooms, this margin keeps it centered */
    &:popover-open {
      position: absolute;
      inset: unset;

      /* need unset first to undo user agent styles */
      /* stylelint-disable order/properties-order */
      inset-block-start: 8ch;
      inset-inline-end: 1ch;

      margin-inline-start: 1ch; /* [2] */
      /* stylelint-enable order/properties-order */
    }
  }

  /* this is a non-model menu */

  /* :root:not([data-blur='false']) {
    & ::backdrop {
      backdrop-filter: blur(3px);
    }
  } */
</style>
