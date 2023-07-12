<script lang="ts">
  import Navigation from './NavigationOlde.svelte';
</script>

<header>
  <h1>Jothsa's Site!</h1>
  <Navigation />
</header>

<style lang="postcss">
  header {
    --_font: var(--header-font), 'Carter One', system-ui;
    display: grid;
    background-image: radial-gradient(
      farthest-corner circle at 100% 0% in oklab,
      oklch(80% 0.4 222) 0%,
      oklch(35% 0.5 313) 100%
    );
  }

  h1 {
    font-family: var(--_font);
  }
</style>
