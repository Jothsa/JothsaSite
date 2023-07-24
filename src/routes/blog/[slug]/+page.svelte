<script lang="ts">
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';
  // import Post from '$components/Post.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<main class="styled-links" id="content">
  <article>
    <hgroup>
      <h1 class="post-title">{data.meta.title}</h1>
      <p class="post-time">
        Published <time datetime={formatDate(data.meta.date, 'full')}
          >{formatDate(data.meta.date)}</time>
      </p>
    </hgroup>

    <div class="prose">
      <svelte:component this={data.content} />
    </div>
    <div class="tags">
      <span class="tag-title h3">Tags</span><br />
      <TagsCloud tags={data.meta.tags}  />
    </div>
  </article>
</main>

<style>
  article {
    display: grid;
    padding: var(--space-s);

    /* max-inline-size: var(--size-content-3); */
    margin-inline: auto;
    gap: var(--space-3sx);
  }

  h1 {
    /* text-transform: capitalize; */
  }

  h1 + p {
    /* margin-top: var(--size-2);
    color: var(--text-2); */
  }

  .tag-title {
    display: flex;
  }
</style>
