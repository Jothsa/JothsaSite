<script lang="ts">
  interface $$Slots {
    default: never;
  }
</script>

<div class="mainNavContainer">
  <nav aria-label="Main Navigation">
    <a href="/">Home</a>
    <a href="/quotes">Quotes</a>
    <a href="/about">About</a>
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

    & a {
      position: relative;
      display: inline-block;
      padding-bottom: min(0.3ch, 10vmax);
      color: oklch(45.2% 0.31321437166460125 264.052020638055);
      font-size: var(--font-size-fluid-1);
      text-align: center;
      text-decoration: none;

      &::after {
        @property --color-1 {
          inherits: false;
          initial-value: blue;
          syntax: '<color>';
        }

        @property --color-2 {
          inherits: false;
          initial-value: blue;
          syntax: '<color>';
        }

        --color-1: var(--random-color-1);
        --color-2: var(--random-color-2);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: clamp(2px, 0.5ch, 10vh);
        background: linear-gradient(90deg, var(--color-1), var(--color-2));
        content: '';

        @media (prefers-reduced-motion: no-preference) {
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.25s ease-out;
        }

        @media (prefers-reduced-motion) {
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
        }
      }

      /* TODO add focus styles */

      &:hover,
      &:focus {
        cursor: pointer;
        outline: none;

        &::after {
          @media (prefers-reduced-motion: no-preference) {
            transform: scaleX(1);
            transform-origin: bottom left;
          }

          @media (prefers-reduced-motion) {
            opacity: 1;
          }
        }
      }

      &:active {
        outline: none;

        &::after {
          outline: none;
        }
      }

      &:nth-child(even) {
        &:active::after {
          --color-1: var(--random-color-1);
          --color-2: var(--random-color-1);
        }
      }

      &:nth-child(odd) {
        &:active::after {
          --color-1: var(--random-color-2);
          --color-2: var(--random-color-2);
        }
      }
    }
  }
</style>
