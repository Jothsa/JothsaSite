<script lang="ts">
  import PostCard from '$components/PostCard.svelte';
  import type { Post } from '$utils/types';
  export let posts: Post[];
</script>

<section>
  <ul class="posts">
    {#each posts as post}
      <PostCard {post} />
    {/each}
  </ul>
</section>

<style>
  /* stylelint-disable selector-type-no-unknown */
  @keyframes animate-in-and-out {
    entry 0% {
      opacity: var(--opacity-low, 0);
      transform: translateY(var(--transform-length, 30%));
    }

    entry 100% {
      opacity: var(--opacity-high, 1);
      transform: translateY(0);
    }

    exit 0% {
      opacity: var(--opacity-high, 1);
      transform: translateY(0);
    }

    exit 100% {
      opacity: var(--opacity-low, 0);
      transform: translateY(calc(var(--transform-length, 30%) * -1));
    }
  }

  /* stylelint-enable selector-type-no-unknown */

  .posts {
    display: grid;
    padding: 0;
    margin: 0;
    gap: var(--space-m);
  }

  @media (prefers-reduced-motion: no-preference) {
    :global(.posts .post) {
      --transform-length: 15%;
      --opacity-low: 0.3;
      animation: linear animate-in-and-out;
      animation-timeline: view();
    }
  }
</style>
