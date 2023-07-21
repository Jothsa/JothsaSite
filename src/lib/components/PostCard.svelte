<script lang="ts">
  // this displays a summary of each post wrapped with an li
  // I could add a conditional wrapper maybe

  import Categories from './Categories.svelte';
  import { formatDate } from '$utils/utils';
  import type { Post } from '$utils/types';
  export let post: Post;
</script>

<li class="post">
  <a class="unread" href={`/blog/${post.slug}`} aria-hidden="true" inert
    ><!-- svelte-ignore a11y-missing-content --><a
      class="unread-l"
      href={`/blog/${post.slug}`} />(unread!)<!-- svelte-ignore a11y-missing-content --><a
      class="unread-r"
      href={`/blog/${post.slug}`} /></a>
  <div class="post-border" />
  <span class="post-link">
    <a href={`/blog/${post.slug}`} class="title styled-link">{post.title}</a>
  </span>
  <span class="date">{formatDate(post.date)}</span>
  <div class="categories">
    <Categories categories={post.categories} catClasses="compact" />
  </div>
  <p class="description">{post.description}</p>
</li>

<style>
  @property --border-grad-angle {
    inherits: false;
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
    --card-bg: oklch(33.53% 0.183 282.8);
    --border-grad-angle: 0deg;
    --border-grad-angle-init: 223deg;
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

    position: relative;

    /* display: grid; */
    padding: var(--space-2xs-cqi);

    background: var(--card-bg);
    contain: content;
    container: post-card / inline-size;
    gap: var(--space-3xs);

    /* grid-template-columns: repeat(2, fit-content(15ch)); */
    transition: transform 300ms ease-in-out;

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
      position: absolute;
      border: var(--border);
      border-image: var(--border-grad) 1;
      inset: 0;
    }

    & .title {
      inline-size: fit-content;
      font-size: var(--step-1);
      text-wrap: balance;
    }

    & .unread {
      --ribbon-bg: var(--contrast);
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      padding-block: 0.5ch;
      margin: 0;
      background-color: var(--ribbon-bg);
      font-size: var(--step--1-cqi);
      font-weight: 600;
      text-align: center;
      text-decoration: none;
      transform: translateX(30%) translateY(0%) rotate(45deg);
      transform-origin: top left;

      & .unread-l,
      & .unread-r {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        margin: 0 -1px; /* tweak */
        background-color: inherit;
        content: '';
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

    & .categories {
      display: flex;
      width: 100%;
      flex-wrap: wrap;

      @container post-card (inline-size < 40ch) {
        display: none;
      }
    }

    & .date {
      /* color: ; */
    }

    & .description {
      text-wrap: pretty;
    }
  }

  /* whyyyyyyyyyyy */
  @media (prefers-reduced-motion: no-preference) {
    .post:hover {
      animation: border-grad-anim 500ms 120ms var(--ease-in-out-2) 1;
    }
  }
</style>
