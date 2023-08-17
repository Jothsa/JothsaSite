<script lang="ts">
  import Navigation from './Navigation.svelte';
  import SupportsNotice from '$components/SupportsNotice.svelte';
</script>

<div class="header-container">
  <header id="header">
    <h1>Jothsa's Site!</h1>
    <Navigation />
    <SupportsNotice />
  </header>
</div>

<style>
  .header-container {
    display: flex;
    inline-size: 100vw;
    container: header / inline-size;
  }

  header {
    --_font: var(--header-font), 'Carter One', system-ui;

    display: grid;
    justify-content: center;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    gap: var(--space-3xs);
    grid-auto-flow: row;
    inline-size: 100%;

    & h1 {
      display: flex;
      justify-content: center;
      font-family: var(--_font);
      justify-items: center;
    }

    @container header (inline-size > 20rem) {
      justify-content: unset;
      justify-items: unset;

      & h1 {
        justify-content: unset;
      }
    }
  }
</style>
