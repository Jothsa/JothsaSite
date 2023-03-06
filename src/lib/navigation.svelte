<script lang="ts">
  interface $$Slots {
    default: never;
  }
  import NavLink from './NavLink.svelte';
</script>

<div class="mainNavContainer">
  <nav aria-label="Main Navigation">
    <NavLink href={'/'} title="Home" />
    <NavLink href={'/quotes'} title="Quotes" />
    <NavLink href={'/about'} title="About" />
  </nav>
</div>

<style lang="postcss">
  @import 'open-props/masks/edges';

  .mainNavContainer {
    backdrop-filter: blur(0);
    filter: drop-shadow(0px 10px 5px oklch(0 0 0 / 0.1));
    transform: translateZ(0);
  }

  nav {
    display: grid;
    padding: min(2rem, 15vh) min(2rem, 15vh) min(5rem, 20vw);
    background-color: oklch(94.91% 0 0);
    grid-auto-flow: column;
    -webkit-mask: var(--mask-edge-drip-bottom);
    place-items: center;

    @media (width < 25rem) {
      grid-auto-flow: row;
    }
  }
</style>
