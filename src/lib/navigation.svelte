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
    display: grid;
    padding: 0.25rem 2rem 5rem;
    background-color: oklch(94.91% 0 0);
    grid-auto-flow: column;
    -webkit-mask: var(--mask-edge-drip-bottom);
    place-items: center;

    & a {
      display: inline-block;
      padding: 1rem 0.5rem;
      color: blue;
      font-size: 1.125rem;
      text-align: center;
      text-decoration: none;

      :hover {
        cursor: pointer;
      }
    }
  }
</style>
