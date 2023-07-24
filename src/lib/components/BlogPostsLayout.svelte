<script lang="ts">
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';
  export let posts: Post[];
  import type { TagsType, Post } from '$utils/types';
  export let currentTag: TagsType | undefined = undefined;
</script>

<div class="grid" id="content">
  <main>
    <PostsDisplay {posts} />
  </main>
  <div class="TagCloud-wrapper">
    <span class="h3 TagCloud-title">TagCloud</span>
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

  .TagCloud-wrapper {
    display: grid;
    gap: var(--space-xs);
    grid-auto-rows: fit-content(5ch);

    & .TagCloud-title {
      display: flex;
      block-size: min-content;
      justify-content: center;
    }
  }
</style>
