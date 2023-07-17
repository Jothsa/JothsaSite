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
    padding: var(--space-xs);
    border-radius: 3ch;
    contain: content;
    outline: solid clamp(3px, 1ch, 2lvh) var(--contrast);
    transition: outline-color 300ms ease-in-out,
      outline-offset 300ms ease-in-out;

    &:hover,
    &:focus-within {
      outline-color: var(--accent);
      outline-offset: calc(var(--space-xs) / -2);
    }

    & a {
      color: var(--secondary-text);
      font-family: 'Carter One', system-ui;
      font-size: var(--step-1);
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
