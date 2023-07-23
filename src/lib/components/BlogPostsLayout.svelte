<script lang="ts">
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import Categories from '$components/Categories.svelte';
  export let posts: Post[];
import type {Post} from '$utils/types'
</script>

<div class="grid" id="content">
  <main>
    <PostsDisplay {posts} />
  </main>
  <div class="tags-wrapper">
    <span class="h3 tags-title">Tags</span>
    <Categories catClasses={'compact'} />
  </div>
</div>

<style>
  .grid {
    display: grid;
    padding-inline: var(--space-s);
    gap: var(--space-l);
    grid-template-columns: auto;
    grid-template-rows: repeat(2, auto);

    @media (width > 100ch) {
      grid-template-columns: 3fr 1fr;
      grid-template-rows: auto;
    }
  }

  .tags-wrapper {
    display: grid;
    gap: var(--space-xs);
    grid-auto-rows: fit-content(5ch);

    & .tags-title {
      display: flex;
      block-size: min-content;
      justify-content: center;
    }
  }
</style>
