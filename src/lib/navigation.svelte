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
    padding: min(2rem, 20vh) min(2rem, 20vh) min(5rem, 35vw);
    background-color: oklch(94.91% 0 0);
    grid-auto-flow: column;
    -webkit-mask: var(--mask-edge-drip-bottom);
    place-items: center;

    @media (width < 25rem) {
      grid-auto-flow: row;
    }

    & a {
      position: relative;
      display: inline-block;
      padding-bottom: min(0.3ch, 24vmax);
      color: oklch(45.2% 0.31321437166460125 264.052020638055);
      font-size: 1.125rem;
      text-align: center;
      text-decoration: none;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: max(2px, 0.5ch);
        background: linear-gradient(
          90deg,
          var(--random-color-1),
          var(--random-color-2)
        );
        content: '';
        transform: scaleX(0);
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }

      /* TODO add focus styles */

      &:hover {
        cursor: pointer;

        &::after {
          @media (prefers-reduced-motion: no-preference) {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        }
      }
    }
  }
</style>
