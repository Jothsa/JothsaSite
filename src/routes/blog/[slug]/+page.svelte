<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { formatDate } from '$utils/utils';
  // import Post from '$components/Post.svelte';
  import TagsCloud from '$components/TagsCloud.svelte';
  import ViewProgress from '$components/ViewProgress.svelte';
  import ReactionsMenu from '$components/ReactionsMenu.svelte';
  import SpreadInterestButton from '$components/SpreadInterestButton.svelte';
  import { url } from '$utils/config';
  export let data: PageData;

  onMount(() => {
    console.log(data.reactions);
  });
</script>

<svelte:head>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.description} />
  <meta property="og:image" content={`${url}og-image/post/${data.slug}.png`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
</svelte:head>

<main id="content">
  <article id="post">
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
    <section class="tags-wrapper" aria-labelledby="tags-label">
      <h3 class="tags-title h3" id="tags-label">Tags</h3>
      <TagsCloud tags={data.meta.tags} addFilterAttr={true} />
    </section>
    <SpreadInterestButton shareText={data.meta.description} />
    <section aria-label="react to this post">
      <div class="reactions-wrapper">
        <ReactionsMenu reactions={data.reactions} slug={data.slug} />
      </div>
      <details>
        <summary>About Reactions</summary>
        <p class="main">
          You may only have one reaction per post. Open the menu to add, swap,
          or remove your reaction.
        </p>
        <p class="fallback">
          You may only have one reaction per post. Select a reaction to add,
          swap, or remove your reaction.
        </p>
      </details>
    </section>
  </article>
</main>

<style>
  main {
    padding: var(--space-xs);
  }

  article {
    position: relative;

    /* display: grid; */

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
    padding: var(--space-s);
    background: var(--secondary);
    grid-area: content;
    -webkit-mask: var(--mask-corner-cut-angles-1);

    /* isolation: isolate; */

    /* filter: drop-shadow(15px 15px 2px var(--contrast)); */

    /* filter: drop-shadow(30px 10px 4px #4444dd); */

    /* inline-size: 90vw; */

    /* min-inline-size: 0; */

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

    /* color: var(--text-2); */
  }

  .reactions-wrapper {
    display: flex;
    justify-content: center;
    grid-area: reactions;
  }

  .tags-wrapper {
    display: grid;
    gap: var(--space-3xs);
    grid-area: tags;
  }

  .tags-title {
    display: flex;
  }

  details {
    contain: content;

    &.fallback {
      display: none;
    }
  }

  :global(:root:is(.no-anchor, .no-popover) details) {
    & .main {
      display: none;
    }

    & .fallback {
      display: unset;
    }
  }
</style>
