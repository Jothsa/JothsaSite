<script lang="ts">
  import { onMount } from 'svelte';
  import DisclosureNav from '$scripts/DisclosureNav';

  onMount(async () => {
		const navMenu: HTMLElement = document.getElementById(
    'mainNav',
  ) as HTMLElement;

  const nav = new DisclosureNav(navMenu, {
    mainNavMenu: {
      openedLabel: 'close the main nav menu',
      closedLabel: 'open the main nav menu',
    },
    booksDropdownMenu: {
      openedLabel: 'close the books dropdown menu',
      closedLabel: 'open the books dropdown menu',
    },
  });
	});
  
</script>

<nav aria-label="Main Navigation" id="mainNav">
  <button
    aria-controls="mainNavMenu"
    id="mainNavMenuButton"
    aria-label="expand or collapse the main navigation menu"
    aria-expanded="false"
    ><svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      ><path
        d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" /></svg
    ></button>
  <ul id="mainNavMenu">
    <li>
      <span><a href="/" rel="preload">Home</a></span>
    </li>
    <li>
      <span
        ><a href="/books" id="booksLink" rel="preload">Books</a>
        <button
          aria-controls="booksDropdownMenu"
          id="booksDropdownButton"
          aria-label="expand or collapse books dropdown menu"
          aria-expanded="false"
          ><svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            ><path
              d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" /></svg
          ></button
        ></span>
      <ul class="subMenu" id="booksDropdownMenu">
        <li>
          <span
            ><a href="/b1" rel="preload" style="--link-stagger: 1"
              >The Last Checkmate</a
            ></span>
        </li>
        <li>
          <span
            ><a href="/b2" rel="preload" style="--link-stagger: 2"
              >Daughters of Victory</a
            ></span>
        </li>
      </ul>
    </li>
    <li>
      <span><a href="/blog" rel="preload">Blog</a></span>
    </li>
    <li>
      <span><a href="/events" rel="preload">Events</a></span>
    </li>
    <li>
      <span><a href="/about" rel="preload">About</a></span>
    </li>
    <li>
      <span><a href="/contact" rel="preload">Contact</a></span>
    </li>
  </ul>
</nav>

<style>
  /* ! Firefox doesn't support :has :( w/o flag */

  /* nav contain: inline-size
      button [aria-expanded]
      ul .expanded
        li
          span
            a [aria-current]
      ...
        li
          span
            a [aria-current]
            button [aria-expanded]
          ul .expanded
            li
              span
                a [aria-current]
            li
              span
                a [aria-current]    
      ul
        li
          span
            a [aria-current]
      ...
              */

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
    --font: 'Carter One';
    --font-size: var(--step-2);
    --link-grad-color-1: oklch(49.56% 0.298 279);
    --link-grad-color-2: oklch(80% 0 0);
    --nav-link-color: oklch(45.2% 0.31321437166460125 264.052020638055);
    --bg-color: oklch(94.91% 0 0);
    --nav-transition-time: 300;
    --underline-height: var(--space-xs);

    position: relative;
    display: grid;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    background-color: var(--bg-color);
    color: var(--nav-link-color);
    container: nav / inline-size;
    font-family: var(--font), sans-serif;
    font-size: var(--font-size);

    & button {
      --button-size: var(--step-2);
      --wiggle-rotation-init: 360deg;
      --wiggle: 10deg;
      display: inline-flex;
      width: var(--button-size);
      height: var(--button-size);
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
        transition: transform 240ms var(--ease-elastic-4);
      }

      & svg {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        color: var(--link-grad-color-1);
        fill: var(--link-grad-color-1);
      }

      @supports not selector(:focus-visible) {
        &:focus {
          outline: solid var(--nav-link-color) 2px;
        }
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
      --button-size: var(--step-4);
      display: inline-flex;
      margin-block-end: var(--space-m);
      place-self: center;
      visibility: visible;

      @container nav (width > 30ch) {
        display: none;
        visibility: hidden;
      }
    }

    & ul {
      display: grid;
      padding: 0;
      margin: 0;
      list-style: none;
      place-content: center center;
      place-items: center;

      @container nav (width > 30ch) {
        place-content: center start;
      }

      & li {
        position: relative;
        text-align: center;

        /* place-self: center; */

        & span {
          display: inline-flex;
          flex-wrap: nowrap;
          gap: var(--space-2xs);
        }

        & a {
          --_nav-transition-time: calc(var(--nav-transition-time) * 1ms);
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
          font-family: var(--font), system-ui, sans-serif;
          text-decoration: none;
          -webkit-text-fill-color: transparent;

          @media (prefers-reduced-motion: no-preference) {
            /* stylelint-disable-next-line plugin/no-low-performance-animation-properties */
            transition: background-position var(--_nav-transition-time)
              ease-in-out;
          }

          /* should keep underline when sub item selected and or add another indicator to button? */
          &[aria-current='page'],
          [aria-current='page'] {
            @media (prefers-contrast: no-preference) and (prefers-reduced-motion: no-preference) {
              background-position: 0;
            }
            font-weight: 600;
            transition: none;
          }

          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: var(--underline-height);
            background: linear-gradient(
              90deg,
              var(--link-grad-color-1),
              var(--link-grad-color-2)
            );
            content: '';

            @media (prefers-reduced-motion: no-preference) {
              transform: scaleX(0);
              transform-origin: bottom left;
              transition: transform var(--_nav-transition-time) ease-out;
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
            }
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
        }
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

      @container nav (width > 30ch) {
        display: inherit;
        height: auto;
        grid-auto-flow: column;
        grid-template-columns: auto;
        visibility: visible;
      }

      /* stylelint-disable-next-line no-descending-specificity */
      & button {
        --button-size: var(--step-2);
      }

      & > li {
        display: grid;
        width: 100%;
        grid-column: 2 / 3;
        grid-template-columns: subgrid;
        place-content: center;
        place-items: center;

        @container nav (width > 30ch) {
          grid-column: initial;
        }

        & > li:has(ul) {
          display: content;
        }

        & > span {
          grid-column: 2 / 3;

          @container nav (width > 30ch) {
            grid-column: initial;
          }
        }

        & ul {
          position: relative;
          overflow: hidden;
          min-inline-size: max-content;
          height: 0;
          border: solid oklch(87% 0 0) 2px;
          border-radius: 4px;
          background: var(--bg-color);
          gap: clamp(2vmin, 0.2rem, 2vmax);
          grid-column: 1 / 4;
          hyphens: none;
          opacity: 0;
          overflow-wrap: normal;

          /* TODO fix transform stacking (is behind cards on homepage) */
          transform: rotateX(90deg), translate3d(0, 0, 5px);
          transform-origin: top center;

          /* 120ms is for hover intent */
          transition: transform 280ms 120ms ease-in-out,
            opacity 300ms 120ms ease-in-out;
          visibility: hidden;

          @container nav (width > 30ch) {
            position: absolute;
            top: calc(100% - 0.25rem);
            left: 0;
            grid-column: initial;
          }

          @media (prefers-reduced-motion: no-preference) {
            & a {
              opacity: 0;
              transform: translate(-100%);
              transition: transform 240ms
                  calc(var(--link-stagger) * 50ms + 50ms) ease-in-out,
                opacity 240ms calc(var(--link-stagger) * 50ms + 100ms)
                  ease-in-out;
            }
          }

          &.expanded {
            height: auto;
            opacity: 1;
            visibility: visible;

            @media (prefers-reduced-motion: no-preference) {
              & a {
                opacity: 1;
                transform: translate(0);
              }
            }
          }
        }
      }
    }
  }
</style>
