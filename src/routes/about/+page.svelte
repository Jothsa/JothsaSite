<script lang="ts">
  import Tweet from '$components/TweetOld.svelte';

  export let data;
  const feed = data.feed;
  console.log(feed);
  console.group('feed items');
  try {
    feed.items.forEach((item) => {
      console.log(item);
    });
  } catch (e) {
    console.log(`uh oh`, e);
  }
  console.groupEnd();
</script>

<main class="styled-links" id="content">
  <p>All about meeeee</p>

  <div class="tweets">
    {#each feed.items as item}
      {#if item.title && item.pubDate && item.creator && item.link}
        <Tweet
          tweetTitle={item.title}
          date={item.pubDate}
          author={item.creator}
          link={item.link}>{@html item.content}</Tweet>
      {/if}
    {/each}
  </div>
</main>

<style>
  .tweets {
    display: flex;
    flex-flow: column;
    gap: var(--space-xs);
  }
</style>
