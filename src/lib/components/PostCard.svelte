<script lang="ts">
  // this displays a summary of each post wrapped with an li
  // I could add a conditional wrapper maybe

  import Categories from './Categories.svelte';
  import { formatDate } from '$utils/utils';
  import type { Post } from '$utils/types';
  export let post: Post;
</script>

<li class="post">
  <a href={`/blog/${post.slug}`} class="title styled-link">{post.title}</a>
  <span class="date">{formatDate(post.date)}</span>
  <div class="categories">
    <Categories categories={post.categories} />
  </div>
  <p class="description">{post.description}</p>
</li>

<style>
  @property --border-grad-angle {
    inherits: false;
    initial-value: 0deg;
    syntax: '<angle>';
  }

  @keyframes post-card-grad-anim {
    from {
      --border-grad-angle: 0deg;
    }

    to {
      --border-grad-angle: 360deg;
    }
  }

  .post {
    --card-bg: var(--primary-bg);
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

    display: grid;
    max-inline-size: 30ch;
    padding: var(--space-2xs-cqi);
    border: var(--border);
    background: var(--primary-bg);
    border-image: var(--border-grad) 1;
    contain: content;
    container: post-card / inline-size;
    gap: var(--space-3xs);
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

    & .title {
      inline-size: fit-content;
      font-size: var(--step-1);
      text-wrap: balance;
    }

    & .categories {
      display: flex;
      flex-wrap: wrap;

      @container post-card (inline-size > 40ch) {
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
      animation: post-card-grad-anim 500ms 120ms ease-in-out 1;
    }
  }
</style>
