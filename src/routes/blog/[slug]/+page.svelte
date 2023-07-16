<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';

  export let data: PageData;
</script>

<!-- SEO -->
<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {formatDate(data.meta.date)}</p>
  </hgroup>

  <!-- Tags -->
  <div class="tags">
    {#each data.meta.categories as category}
      <a class="category" href={`/blog/categories/${category}`}
        >&num;{category}</a>
    {/each}
  </div>

  <!-- Post -->
  <div class="prose">
    <svelte:component this={data.content} />
  </div>
</article>

<style>
  article {
    max-inline-size: var(--size-content-3);
    margin-inline: auto;
  }

  h1 {
    text-transform: capitalize;
  }

  h1 + p {
    margin-top: var(--size-2);
    color: var(--text-2);
  }

  .tags {
    display: flex;
    margin-top: var(--size-7);
    gap: var(--size-3);
  }

  .tags > * {
    padding: var(--size-2) var(--size-3);
    border-radius: var(--radius-round);
  }
</style>
