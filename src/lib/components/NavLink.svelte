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
    --_font: var(--header-font, 'Carter One');
    --font-size: var(--step-2);
    --link-grad-color-1: oklch(49.56% 0.298 279);
    --link-grad-color-2: oklch(80% 0 0);
    --nav-link-color: oklch(45.2% 0.31321437166460125 264.052020638055);
    --nav-transition-time: 300ms;
    --underline-height: var(--space-xs);

    position: relative;
    display: inline-block;
    padding-block-end: clamp(2px, 0.1em, 0.2em);
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
    contain: content;
    font-family: var(--_font), system-ui, serif;
    font-size: var(--font-size);
    text-decoration: none;
    -webkit-text-fill-color: transparent;

    @media (prefers-reduced-motion: no-preference) {
      transition: background-position var(--nav-transition-time) ease-in-out;
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      inline-size: 100%;
      block-size: var(--underline-height);
      background: linear-gradient(
        90deg,
        var(--link-grad-color-1),
        var(--link-grad-color-2)
      );
      content: '';
    }

    @media (prefers-contrast: more) {
      &::after {
        background: var(--nav-link-color);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      &::after {
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: transform var(--nav-transition-time) ease-in-out;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      &::after {
        opacity: 0;
        transition: opacity var(--nav-transition-time) ease-in-out;
      }
    }

    &:is(:hover, :focus-visible) {
      @media (prefers-contrast: no-preference) {
        background-position: 0;
        outline: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        &::after {
          transform: scaleX(1);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        &::after {
          opacity: 1;
        }
      }
    }

    @media (prefers-contrast: more) {
      &:focus-visible {
        border-radius: 5%;
        outline: var(--nav-link-color) 2px solid;
        outline-offset: 2px;
      }
    }

    @media (prefers-contrast: no-preference) {
      &[aria-current='page'] {
        background-position: 0;
      }
    }

    @media (prefers-contrast: more) {
      /* TODO Change gradient for contrast or something ig */
      &[aria-current='page']::after {
        opacity: 1;
        transform: scaleX(1);
      }
    }
  }
</style>
