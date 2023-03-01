<script lang="ts">
  interface $$Slots {
    default: never;
  }
</script>

<nav aria-label="Main Navigation">
  <a href="/">Home</a>
  <a href="/quotes">Quotes</a>
  <a href="/about">About</a>
</nav>

<style lang="postcss">
  @import 'open-props/masks/edges';

  nav {
    background-color: oklch(94.91% 0 0);
    padding: 0.25rem 2rem 5rem;
    display: grid;
    place-items: center;
    -webkit-mask: var(--mask-edge-drip-bottom);
    grid-auto-flow: column;

    & a {
      text-decoration: none;
      text-align: center;
      display: inline-block;
      color: blue;
      font-size: 1.125rem;
      padding: 1rem 0.5rem;
    }
  }
</style>
