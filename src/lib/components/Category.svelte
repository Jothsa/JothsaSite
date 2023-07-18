<script lang="ts">
  // displays a category in a list element
  // TODO prob use conditional wrapper
  import type { Categories } from '$utils/types';
  export let category: Categories;
</script>

<li class={`category ${category}`}>
  <a href={`/blog/categories/${category}`}>{category}</a>
</li>

<style>
  .category {
    --tag-bg: oklch(70% 0.1 215);
    --_rotation-factor: 1;
    --_rotation-deg: 7deg;
    --_rotation: calc(var(--_rotation-deg) * var(--_rotation-factor));

    /* not ideal */
    min-inline-size: max-content;
    contain: content;

    @container categories (inline-size <= 30ch) {
      padding-inline: 1ch;
      border-radius: 0.5ch;
      background: var(--tag-bg);
      transition: rotate 200ms 120ms var(--ease-elastic-1);

      &:hover {
        @media (prefers-reduced-motion: no-preference) {
          rotate: var(--_rotation);
        }
      }
    }

    @container categories (inline-size > 30ch) {
      padding: var(--space-xs-cqi);
      border-radius: 3ch;
      outline: solid clamp(3px, 10cqi, 1ch) var(--contrast);
      transition: outline-color 300ms 120ms ease-in-out,
        outline-offset 300ms 120ms ease-in-out;
    }

    &:hover,
    &:focus-within {
      outline-color: var(--accent);
      outline-offset: calc(var(--space-xs-cqi) / -2);
    }

    &:nth-of-type(odd) {
      --_rotation-factor: -1;
    }

    &:nth-of-type(even) {
      --_rotation: 5deg;
    }

    &:nth-of-type(3n + 1) {
      --_rotation: 10deg;
    }

    & a {
      color: var(--secondary-text);
      font-family: 'Carter One', system-ui;
      font-size: var(--step-1-cqi);
      font-weight: 500;
      text-decoration: none;

      &:hover,
      &:focus-visible {
        outline: none;
      }

      &:visited {
        color: var(--secondary-text);
      }
    }
  }
</style>
