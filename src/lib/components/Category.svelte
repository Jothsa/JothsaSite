<script lang="ts">
  // displays a category in a list element
  // TODO prob use conditional wrapper
  import type { Categories } from '$utils/types';
  export let category: Categories;
  export let classNames: 'large' | 'compact' | '' = '';
  export let isCurrentCat: boolean = false;
</script>

<li class={`category ${category} ${classNames}`} class:current={isCurrentCat}>
  <a href={`/blog/categories/${category}`}>{category}</a>
</li>

<style>
  .category {
    --tag-bg: var(--accent);
    --outline: var(--accent);
    --outline-highlight: var(--contrast);
    --text: var(--secondary-text);
    --_rotation-factor: 1;
    --_rotation-deg: 7deg;
    --_rotation: calc(var(--_rotation-deg) * var(--_rotation-factor));

    /* not ideal */
    min-inline-size: max-content;
    contain: content;

    /* container: category / inline-size; */

    &.current {
      outline: red solid 2px 2px;
    }

    & a {
      color: var(--text);
      font-family: 'Carter One', system-ui;

      /* font-size: inherit; */
      font-weight: 500;
      text-decoration: none;

      &:hover,
      &:focus-visible {
        outline: none;
      }

      &:visited {
        color: var(--text);
      }
    }

    @container categories (inline-size <= 30ch) {
      &:not(.large) {
        padding-inline: 1ch;
        border-radius: 0.5ch;
        background: var(--tag-bg);
        font-size: var(--step-1-cqi);
        transition: rotate 200ms 120ms var(--ease-elastic-1);

        &:is(:hover, :focus-within) {
          @media (prefers-reduced-motion: no-preference) {
            rotate: var(--_rotation);
          }
        }

        &:focus-within {
          @media (prefers-reduced-motion) {
            outline: solid 1px var(--outline-highlight);
          }
        }
      }
    }

    @container categories (inline-size > 30ch) {
      &:not(.compact) {
        padding: var(--space-xs-cqi);
        border-radius: 3ch;
        font-size: var(--step-1-cqi);
        outline: solid clamp(3px, 10cqi, 1ch) var(--outline);
        transition: outline-color 300ms 120ms ease-in-out,
          outline-offset 300ms 120ms ease-in-out;
      }
    }

    &.large {
      padding: var(--space-xs-cqi);
      border-radius: 3ch;
      font-size: var(--step-1-cqi);
      outline: solid clamp(3px, 10cqi, 1ch) var(--outline);
      transition: outline-color 300ms 120ms ease-in-out,
        outline-offset 300ms 120ms ease-in-out;
    }

    &.compact {
      padding-inline: 1ch;
      border-radius: 0.5ch;
      background: var(--tag-bg);
      font-size: var(--step-0-cqi);
      transition: rotate 200ms 120ms var(--ease-elastic-1);

      &:is(:hover, :focus-within) {
        @media (prefers-reduced-motion: no-preference) {
          rotate: var(--_rotation);
        }
      }

      &:focus-within {
          @media (prefers-reduced-motion) {
            outline: solid 2px var(--outline-highlight) 2px;
          }
        }
    }

    &:hover,
    &:focus-within {
      outline-color: var(--outline-highlight);
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
  }
</style>
