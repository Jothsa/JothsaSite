<script lang="ts">
  import { page } from '$app/stores';
  $: isActive = $page.url.pathname === href;
  export let title: string;
  export let href: string;
</script>

<a {href} aria-current={isActive && 'page'} rel="preload">{title}</a>

<style>
  @property --link-grad-color-1 {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  @property --link-grad-color-2 {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  @property --nav-link-color {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  a {
    --link-grad-color-1: var(--pink);
    --link-grad-color-2: oklch(80% 0 0);
    --nav-link-color: oklch(45.2% 0.31321437166460125 264.052020638055);
    --nav-transition-time: 0.3s;
    position: relative;
    display: inline-block;
    padding-bottom: min(0.3ch, 10vmax);
    margin-bottom: calc(clamp(2px, 0.5ch, 10vh) + min(5vh, 0.2rem));
    -webkit-background-clip: text;
    background-image: linear-gradient(
      90deg,
      var(--link-grad-color-1),
      var(--link-grad-color-2) 50%,
      var(--nav-link-color) 50%
    );
    background-position: -100%;
    background-size: 200% 100%;

    color: var(--nav-link-color);
    font-family: 'Carter One', serif;

    /* font-size: max(1.25rem, min(5vw, 2rem)); */

    /* font-size: max(1.5rem, min(6vw, 2.5rem)); */
    text-align: center;
    text-decoration: none;
    -webkit-text-fill-color: transparent;

    @media (prefers-reduced-motion: no-preference) {
      /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
      transition: background-position var(--nav-transition-time) ease-in-out;
    }

    &[aria-current='page'] {
      @media (prefers-contrast: no-preference) and (prefers-reduced-motion: no-preference) {
        background-position: 0;
      }
      font-weight: 600;
      transition: none;
    }

    /* &:active {
			--link-grad-color-1: var(--random-color-2);
			--link-grad-color-2: var(--random-color-1);
		} */

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: clamp(2px, 0.5ch, 10vh);
      background: linear-gradient(
        90deg,
        var(--link-grad-color-1),
        var(--link-grad-color-2)
      );
      content: '';

      @media (prefers-reduced-motion: no-preference) {
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: transform var(--nav-transition-time) ease-out;
      }

      @media (prefers-reduced-motion) {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
    }

    /* TODO add focus styles */

    &:hover,
    &:focus {
      @media (prefers-reduced-motion: no-preference) {
        background-position: 0;
        outline: none;
      }
      cursor: pointer;

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
  }
</style>
