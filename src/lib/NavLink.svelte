<script lang="ts">
  import { page } from '$app/stores';
  // $: isActive = $page.url.pathname.split('/')[1] === href.split('/')[1];
  $: isActive = $page.url.pathname === href;
  console.log('path: ' + $page.url.pathname);
  console.log('href: ' + $$props.href);
  export let title: string;
  export let href: string;
</script>

<a {href} class:active={isActive}>
  {title}
</a>

<style lang="postcss">
  a {
    position: relative;
    display: inline-block;
    padding-bottom: min(0.3ch, 10vmax);
    margin-bottom: calc(clamp(2px, 0.5ch, 10vh) + min(5vh, 0.2rem));
    color: oklch(45.2% 0.31321437166460125 264.052020638055);
    font-size: var(--font-size-fluid-1);
    text-align: center;
    text-decoration: none;

    &.active {
      background: linear-gradient(
        90deg,
        var(--random-color-1),
        var(--random-color-2)
      );
      background-clip: text;
      color: transparent;
      font-weight: 600;
      transition: none;
    }

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
</style>
