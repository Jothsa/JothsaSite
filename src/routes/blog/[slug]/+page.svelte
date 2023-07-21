<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';
  import Categories from '$components/Categories.svelte';
  import Post from '$components/Post.svelte';

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


  <!-- <div class="tags">
    <Categories categories={data.meta.categories} />
  </div> -->


  <div class="prose styled-links">
    <svelte:component this={data.content} />
  </div>
</article>

<style>
  article {
    display: grid;

    /* max-inline-size: var(--size-content-3); */
    margin-inline: auto;
    gap: var(--space-3sx);
  }

  h1 {
    /* text-transform: capitalize; */
  }

  h1 + p {
    margin-top: var(--size-2);
    color: var(--text-2);
  }

  .tags {
    display: flex;

    /* not permanent! remove once post grid, sidebars, etc can influence sizing */
    inline-size: 30ch;
  }
</style>
