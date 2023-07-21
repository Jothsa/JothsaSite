<script lang="ts">
  import Categories from '$components/Categories.svelte';
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<div class="grid">
  <PostsDisplay posts={data.posts} />
  <Categories />
</div>

<style>
  .grid {
    display: grid;
    gap: var(--space-l);
    grid-template-columns: repeat(2, auto);
  }
</style>