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
  .posts {
    display: grid;
    gap: var(--space-m);
  }
</style>
