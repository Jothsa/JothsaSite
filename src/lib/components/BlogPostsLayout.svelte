<script lang="ts">
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';
  import type { TagsType, Post } from '$utils/types';
  // import Pagination from './Pagination.svelte';
  export let posts: Post[];
  export let currentTag: TagsType | undefined = undefined;
  export let pages: number = 0;
  let currentPage: number = 0;
</script>

<div class="grid" id="content">
  <main>
    <div class="posts-wrapper">
      <PostsDisplay {posts} />
      <!-- <Pagination pages={6} /> -->
    </div>
  </main>
  <div class="tags-wrapper">
    <span class="h3 tags-title">Tags</span>
    <TagsCloud {currentTag} />
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

  .posts-wrapper {
    max-inline-size: 75ch;
  }

  .tags-wrapper {
    display: grid;
    gap: var(--space-xs);
    grid-auto-rows: fit-content(5ch);

    & .tags-title {
      display: flex;
      block-size: min-content;
      justify-content: center;
      border-block-end: var(--accent) 2px dashed;
    }
  }
</style>
