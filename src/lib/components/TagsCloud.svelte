<script lang="ts">
  // TODO display all TagCloud use type array thing to generate
  import { TagsList } from '$utils/types';
  import type { TagsType } from '$utils/types';

  import PostTag from './PostTag.svelte';
  export let tags: TagsType[] = [...TagsList];
  export let currentTag: TagsType | undefined = undefined;

  // whether to sort alphabetically or not
  // could add random and length options for sorting
  export let sort = true;

  if (sort) {
    tags = tags.sort((a, b) => a.localeCompare(b));
  }
</script>

<div class="tags-container">
  <ul class="post-tag">
    {#each tags as t}
      <PostTag tag={t} isCurrentTag={currentTag === t} />
    {/each}
  </ul>
</div>

<style>
  .tags-container {
    min-inline-size: 100%;
    block-size: fit-content;
    min-block-size: 100%;

    /* block-size: fit-content; */
    container: tags / inline-size;

    & .post-tag {
      display: flex;
      flex-wrap: wrap;
      padding: 0;

      /* browser default list styles are messing with this */
      margin: 0;

      /* could make s-xl pair maybe */
      gap: var(--space-s-l-cqi);
    }
  }
</style>
