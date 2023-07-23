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

    padding-inline: 1ch;
    border-radius: 0.5ch;
    background: var(--tag-bg);
    contain: content;
    font-size: var(--step-1-cqi);
    transition: rotate 200ms 120ms var(--ease-elastic-1);

    /* container: category / inline-size; */

    & a {
      color: var(--text);
      font-family: 'Carter One', system-ui;

      /* font-size: inherit; */
      font-weight: 500;
      text-decoration: none;

      &:visited {
        color: var(--text);
      }
    }

    &.current {
      background: var(--text);

      & a {
        color: var(--tag-bg);
      }
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

    &:is(:hover, :focus-within) {
      @media (prefers-reduced-motion: no-preference) {
        rotate: var(--_rotation);

        & a {
          outline: none;
        }
      }
    }

    @media (prefers-reduced-motion) {
      &:is(:focus-within, :focus-visible) {
        outline: solid clamp(3px, .4ch, 10px) var(--outline-highlight);

        & a {
          outline: none;
        }
      }
    }
  }
</style>
