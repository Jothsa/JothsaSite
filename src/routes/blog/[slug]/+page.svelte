<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';
  // import Post from '$components/Post.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';
  import ScrollProgress from '$components/ScrollProgress.svelte';
  import Reactions from '$components/Reactions.svelte';
  import ReactionsFallback from '$components/ReactionsFallback.svelte';
  export let data: PageData;
  let postID = 'post';
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<main id="content">
  <article id="post">
    <ScrollProgress {postID} direction="bottom" />
    <hgroup>
      <!-- ? should this just be an h2 tag? -->
      <h1 class="post-title h2">{data.meta.title}</h1>
      <p class="post-time">
        Published <time datetime={formatDate(data.meta.date, 'full')}
          >{formatDate(data.meta.date)}</time>
      </p>
    </hgroup>

    <div class="prose styled-links">
      <svelte:component this={data.content} />
    </div>
    <div class="tags-wrapper">
      <span class="tags-title h3">Tags</span>
      <TagsCloud tags={data.meta.tags} />
    </div>
    <div class="reactions-wrapper">
      <Reactions />
      <ReactionsFallback />
    </div>
  </article>
</main>

<style>
  main {
    padding: var(--space-xs);
  }

  article {
    position: relative;
    display: grid;
    inline-size: fit-content;
    padding: var(--space-xs);
    gap: var(--space-m);
    isolation: isolate;
    view-timeline: --post block;
  }

  .prose {
    position: relative;
    padding: 2ch;
    background: var(--secondary);

    /* isolation: isolate; */

    /* filter: drop-shadow(15px 15px 2px var(--contrast)); */

    /* filter: drop-shadow(30px 10px 4px #4444dd); */

    -webkit-mask: var(--mask-corner-cut-angles-1);

    /* &::after {
      position: absolute;
      z-index: -1;
      background: var(--contrast);
      content: '';
      inset: 0;
      -webkit-mask: var(--mask-corner-cut-angles-1);
      transform: translate(5px, 5px);
    } */
  }

  .post-title + p {
    margin-block-start: var(--size-2xs);
    color: var(--text-2);
  }

  .reactions-wrapper {
    position: static;
    right: 10lvh;
    bottom: 10lvh;
  }

  .tags-wrapper {
    display: grid;
    gap: var(--space-3xs);
  }

  .tags-title {
    display: flex;
  }
</style>
