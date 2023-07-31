<script lang="ts">
  // this displays a summary of each post wrapped with an li
  // I could add a conditional wrapper maybe

  import TagsCloud from './TagsCloud.svelte';
  import { formatDate } from '$utils/utils';
  import type { Post } from '$utils/types';

  export let wrapperTag: string = 'li';
  export let isLIRole = true;
  export let post: Post;
</script>

<svelte:element
  this={wrapperTag}
  class="post"
  role={isLIRole ? 'listitem' : ''}>
  <a
    class="unread"
    href={`/blog/${post.slug}`}
    aria-hidden="true"
    tabindex="-1"
    inert
    ><!-- svelte-ignore a11y-missing-content --><a
      class="unread-l"
      href={`/blog/${post.slug}`}
      tabindex="-1" />(unread!)<!-- svelte-ignore a11y-missing-content --><a
      class="unread-r"
      href={`/blog/${post.slug}`}
      tabindex="-1" /></a>
  <div class="post-border" />
  <a href={`/blog/${post.slug}`} class="post-link title styled-link"
    >{post.title}</a>
  <span class="date">{formatDate(post.date)}</span>
  <div class="tag-cloud">
    <TagsCloud tags={post.tags} />
  </div>
  <p class="description">{post.description}</p>
</svelte:element>

<style>
  @property --border-grad-angle {
    inherits: true;
    initial-value: 0deg;
    syntax: '<angle>';
  }

  @keyframes border-grad-anim {
    from {
      --border-grad-angle: 0deg;
    }

    to {
      --border-grad-angle: 360deg;
    }
  }

  .post {
    --card-bg: var(--secondary);
    --border-grad-angle-init: 223deg;

    position: relative;
    padding: var(--space-2xs-cqi);
    background: var(--card-bg);
    contain: content;
    container: post-card / inline-size;
    list-style: none;

    &:nth-of-type(odd) {
      --border-grad-angle-init: 30deg;
    }

    &:nth-of-type(3n + 1) {
      --border-grad-angle-init: 90deg;
    }

    &:nth-of-type(5n + 1) {
      --border-grad-angle-init: 120deg;
    }

    & .post-border {
      --border-grad-angle: 0deg;
      --_border-grad-angle: calc(
        var(--border-grad-angle-init) + var(--border-grad-angle)
      );
      --border: solid clamp(4px, 0.55ch, 10px);
      --border-grad-color-1: oklch(80% 0.4 222);
      --border-grad-color-2: oklch(35% 0.5 313);
      --border-grad: conic-gradient(
        from var(--_border-grad-angle) at 50% 50% in oklab,
        oklch(80% 0.4 222 / 0) 0%,
        53%,
        var(--border-grad-color-1) 25% 32%,
        83%,
        var(--border-grad-color-2) 100%
      );

      position: absolute;
      width: 100%;
      height: 100%;
      border: var(--border);
      border-image: var(--border-grad) 1;
      inset: 0;
      pointer-events: none;
    }

    & .title {
      inline-size: fit-content;
      font-size: var(--step-1);
      text-wrap: balance;

      &:focus-visible {
        outline: none;
      }
    }

    & .unread {
      --ribbon-bg: var(--contrast);
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      padding-block: 0.5ch;
      margin: 0;
      background-color: var(--ribbon-bg);
      color: var(--secondary-text);
      cursor: default;
      font-size: var(--step--1-cqi);
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      transform: translateX(30%) translateY(0%) rotate(45deg);
      transform-origin: top left;

      @container post-card (inline-size < 30ch) {
        display: none;
      }

      & .unread-l,
      & .unread-r {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0 -1px; /* tweak */
        background-color: inherit;
      }

      & .unread-l {
        inset-inline-end: 100%;
      }

      & .unread-r {
        inset-inline-start: 100%;
      }

      &:visited,
      & :is(.unread-l, .unread-r):visited {
        background-color: var(--card-bg);
        color: var(--card-bg);
      }
    }

    & .tag-cloud {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      padding-block: 1ch;

      @container post-card (inline-size < 30ch) {
        display: none;
      }
    }

    & .date {
      /* color: ; */
    }

    & .description {
      margin-block-start: 0ch;
      text-wrap: pretty;
    }
  }

  /* whyyyyyyyyyyy 
  for sOmE rEaSoN if I do the anim on .post it removes the padding while the anim runs 
  and of course nesting isn't working correctly either */

  @media (prefers-reduced-motion: no-preference) {
    .post:is(:hover) .post-border {
      animation: border-grad-anim 500ms 120ms var(--ease-in-out-2) 1;
    }
  }
</style>
