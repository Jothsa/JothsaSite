<script lang="ts">
  // displays a Tag in a list element
  // TODO prob use conditional wrapper
  // TODO convert to radio buttons maybe

  import type { TagsType } from '$utils/types';
  export let tag: TagsType;
  export let isCurrentTag: boolean = false;
  export let addFilterAttr = false;
</script>

<li class={`tag ${tag}`} class:current={isCurrentTag}>
  <a
    href={`/blog/tags/${tag}`}
    class="unstyled-link"
    data-pagefind-filter={addFilterAttr ? `tag` : null}>{tag}</a>
</li>

<style>
  .tag {
    --tag-bg: var(--accent);
    --outline: var(--accent);
    --outline-highlight: var(--contrast);
    --text: var(--secondary-text);
    --_rotation-factor: 1;
    --_rotation-deg: 7deg;
    --_rotation: calc(var(--_rotation-deg) * var(--_rotation-factor));

    padding-inline: 1ch;
    border-radius: 0.5ch;
    background: var(--tag-bg);
    contain: content;
    font-size: var(--step-1-cqi);
    transition:
      rotate 200ms 120ms var(--ease-elastic-1),
      background 300ms var(--ease-elastic-1);

    /* container: tag / inline-size; */

    & a {
      color: var(--text);
      font-family: 'Carter One', system-ui;
      font-size: inherit;
      font-weight: 500;
      text-decoration: none;
      transition: color 300ms var(--ease-elastic-1);

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
        outline: solid clamp(3px, 0.4ch, 10px) var(--outline-highlight);

        & a {
          outline: none;
        }
      }
    }
  }
</style>
