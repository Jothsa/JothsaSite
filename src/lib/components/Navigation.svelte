<script lang="ts">
  import NavLink from './NavLink.svelte';

  let navButtonLabel = 'collapse the main navigation menu';
  let navExpanded = true;

  function navButtonOnClick() {
    navExpanded = !navExpanded;
    if (navExpanded) navButtonLabel = 'collapse the main navigation menu';
    else navButtonLabel = 'expand the main navigation menu';
  }
</script>

<nav aria-label="Main" id="mainNav">
  <button
    aria-controls="mainNavMenu"
    id="mainNavMenuButton"
    aria-label={navButtonLabel}
    aria-expanded={navExpanded}
    on:click={navButtonOnClick}
    ><svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      ><path
        d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" /></svg
    ></button>
  <ul id="mainNavMenu" class:expanded={navExpanded}>
    <li>
      <NavLink href="/" title="Home" />
    </li>
    <li>
      <NavLink href="/blog" title="Blog" />
    </li>
    <li>
      <NavLink href="/about" title="About" />
    </li>
  </ul>
</nav>

<style>
  /* idk why lang="postcss" breaks it :sob:
   ! Firefox doesn't support :has :( w/o flag */

  /* nav contain: inline-size
      button [aria-expanded]
      ul .expanded
        li
            a [aria-current]
        li
            a [aria-current]
      ...
              */

  @keyframes wiggle {
    0% {
      transform: rotate(calc(var(--wiggle-rotation-init) - var(--wiggle)));
    }

    50% {
      transform: rotate(calc(var(--wiggle-rotation-init) + var(--wiggle)));
    }

    100% {
      transform: rotate(var(--wiggle-rotation-init));
    }
  }

  @keyframes hue-shift {
    from {
      filter: hue-rotate(0);
    }

    to {
      filter: hue-rotate(270deg);
    }
  }

  nav {
    --_font: var(--header-font), 'Carter One';
    --font-size: var(--step-2);
    --nav-link-color: var(--contrast);
    --bg-color: transparent;
    --nav-transition-time: 300;
    --underline-height: var(--space-xs);

    position: relative;
    display: grid;
    background-color: var(--bg-color);
    color: var(--nav-link-color);
    container: nav / inline-size;
    font-family: var(--_font), sans-serif;
    font-size: var(--font-size);

    & button {
      --button-size: var(--step-2);
      --_button-size: var(--button-size, 1.25em);
      --wiggle-rotation-init: 360deg;
      --wiggle: 10deg;
      display: inline-flex;
      width: var(--_button-size);
      height: var(--_button-size);
      align-items: center;
      justify-content: center;
      padding: 0.1em;
      border: none;
      border-radius: 50%;
      animation: none;
      background: transparent;
      line-height: inherit;
      outline: none;
      place-self: center center;
      -webkit-tap-highlight-color: transparent;
      touch-action: none;
      transform: rotate(360deg);

      @media (prefers-reduced-motion: no-preference) {
        transition: transform 240ms ease-in-out;
      }

      & svg {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        color: var(--nav-link-color);
        fill: var(--nav-link-color);
      }

      &:focus-visible {
        outline: solid var(--nav-link-color) 2px;
      }

      &:hover {
        @media (prefers-reduced-motion: no-preference) and (hover) {
          animation: wiggle 240ms linear 1;
        }

        & svg {
          animation: hue-shift 300ms linear 1 normal forwards;
        }
      }

      &[aria-expanded='true'] {
        --wiggle-rotation-init: 180deg;
        transform: rotate(180deg);
      }
    }

    /* stylelint-disable-next-line no-descending-specificity */
    & > button {
      --_button-size: var(--step-4);

      display: inline-flex;
      margin-block-end: var(--space-m);
      place-self: center;
      visibility: visible;

      @container nav (inline-size > 18rem) {
        /* I had !important here, don't think that's needed 
        I think display and vis is redundant */
        display: none;
        visibility: hidden;
      }
    }

    & ul {
      display: grid;
      padding: 0;
      margin: 0;
      font-size: 1rem;
      list-style: none;
      place-content: center center;
      place-items: center;

      @container nav (inline-size > 18rem) {
        place-content: center start;
      }

      & li {
        position: relative;
        text-align: center;

        /* place-self: center; */
      }
    }

    & > ul {
      height: 0;
      gap: var(--space-xs-s);
      grid-auto-flow: row;
      grid-template-columns: repeat(3, fit-content(5ch));
      visibility: hidden;

      &.expanded {
        display: inherit;
        height: auto;
        visibility: visible;
      }

      @container nav (inline-size > 18rem) {
        display: inherit;
        height: auto;
        grid-auto-flow: column;
        grid-template-columns: auto;
        visibility: visible;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      & button {
        --_button-size: var(--step-2);
      }

      & > li {
        display: grid;
        width: 100%;
        grid-column: 2 / 3;
        grid-template-columns: subgrid;
        place-content: center;
        place-items: center;

        @container nav (inline-size > 18rem) {
          grid-column: initial;
        }

        & > span {
          grid-column: 2 / 3;

          @container nav (inline-size > 18rem) {
            grid-column: unset;
          }
        }
      }
    }
  }
</style>
