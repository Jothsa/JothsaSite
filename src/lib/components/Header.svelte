<script lang="ts">
  import Navigation from './Navigation.svelte';
</script>

<header id="header">
  <h1>Jothsa's Site!</h1>
  <Navigation />
</header>

<style>
  header {
    --_font: var(--header-font), 'Carter One', system-ui;

    display: grid;
    justify-content: center;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    grid-auto-flow: row;

    & h1 {
      display: flex;
      justify-content: center;
      font-family: var(--_font);
    }

    @media (width > 30ch) {
      justify-content: unset;

      & h1 {
        justify-content: unset;
      }
    }
  }
</style>
