<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';
  // import Post from '$components/Post.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';
  import ScrollProgress from '$components/ScrollProgress.svelte';
  import ViewProgress from '$components/ViewProgress.svelte';
  import Reactions from '$components/Reactions.svelte';
  import ReactionsFallback from '$components/ReactionsFallback.svelte';
  export let data: PageData;

  onMount(async () => {
    console.log(data.reactions);
  });
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<main id="content">
  <article id="post">
    <!-- <ScrollProgress {postID} direction="bottom" changeOpacity={true} /> -->
    <hgroup>
      <!-- ? should this just be an h2 tag? -->
      <h1 class="post-title h2">{data.meta.title}</h1>
      <p class="post-time">
        Published <time datetime={formatDate(data.meta.date, 'full')}
          >{formatDate(data.meta.date)}</time>
      </p>
    </hgroup>

    <ViewProgress viewTimelineName={'--post'} style={'grid-area: content'} />

    <div class="prose styled-links" id="post-content">
      <svelte:component this={data.content} />
    </div>
    <div class="tags-wrapper">
      <span class="tags-title h3">Tags</span>
      <TagsCloud tags={data.meta.tags} />
    </div>
    <div class="reactions-wrapper">
      <Reactions reactions={data.reactions} slug={data.slug} />
    </div>
    <div class="reactions-fallback-wrapper">
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
    padding-block-start: 0;
    gap: var(--space-m);
    grid-template-areas:
      'header'
      'content'
      'tags'
      'reactions';
    isolation: isolate;
    timeline-scope: --post;
  }

  hgroup {
    grid-area: header;
  }

  .prose {
    padding: 2ch;
    background: var(--secondary);
    grid-area: content;

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

  #post-content {
    position: relative;
    view-timeline: --post block;
  }

  .post-title + p {
    margin-block-start: var(--size-2xs);
    color: var(--text-2);
  }

  .reactions-wrapper {
    display: flex;
    justify-content: center;
    grid-area: reactions;
  }

  .reactions-fallback-wrapper {
    display: none;
    grid-area: reactions;
  }

  &:global(:root:is(.no-popover, .no-anchor) .reactions-wrapper) {
    display: none;
  }

  &:global(:root:is(.no-popover, .no-anchor) .reactions-fallback-wrapper) {
    display: unset;
  }

  .tags-wrapper {
    display: grid;
    gap: var(--space-3xs);
    grid-area: tags;
  }

  .tags-title {
    display: flex;
  }
</style>
