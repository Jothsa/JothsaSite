<script lang="ts">
  interface $$Slots {
    default: never;
  }
  import NavLink from './NavLink.svelte';
</script>

<div class="mainNavContainer">
  <nav aria-label="Main Navigation">
    <NavLink href={'/'} title="Home" />
    <NavLink href={'/blog'} title="Blog" />
    <NavLink href={'/quotes'} title="Quotes" />
    <NavLink href={'/prayers'} title="Prayers" />
    <NavLink href={'/comics'} title="Comics" />
    <NavLink href={'/about'} title="About" />
  </nav>
</div>

<style lang="postcss">
  @import 'open-props/masks/edges';

  /* .mainNavContainer {
    backdrop-filter: blur(0);
    filter: drop-shadow(0px 10px 5px oklch(0 0 0 / 0.1));
    transform: translateZ(0);
  } */

  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: min(2rem, 5vh) min(2rem, 15vh) min(2.25rem, 6vw);
    background-color: oklch(94.91% 0 0);
    column-gap: min(10vh, 3rem);
    -webkit-mask: var(--mask-edge-drip-bottom);

    /* &::before {
      position: absolute;
      bottom: -2rem;
      left: 1rem;
      background: oklch(0 0 0);

      filter: blur(3px);
    } */
  }
</style>
