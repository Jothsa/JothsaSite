<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { pb } from './pocketbase';
  import QuoteCard from '$lib/quoteCard.svelte';
  // import { Grid } from '@svelteuidev/core';
  import Masonry from './Masonry.svelte';
  // TODO maybe set type
  let quotes: any[] = []; // eslint-disable-line  @typescript-eslint/no-explicit-any
  //let newQuote: string;
  let unsubscribe: () => void;

  interface $$Slots {
    default: never;
  }

  onMount(async () => {
    // get quotes in list format
    const quotesList = await pb.collection('quotes').getList(1, 50, {
      // sort: '',
      expand: 'author, source, author.universe',
    });
    quotes = quotesList.items;

    // Subscribe to realtime, think there's an easier way without setting unsubscribe as var
    unsubscribe = await pb
      .collection('quotes')
      .subscribe('*', async ({ action, record }) => {
        if (action === 'create') {
          // Fetch associated author
          const author = await pb.collection('author').getOne(record.author);
          const source = await pb.collection('source').getOne(record.source);
          // TODO Universe might not be correctly implemented here idk
          const universe = await pb
            .collection('universes')
            .getOne(record.source);
          record.expand = { author, source, universe };
          quotes = [...quotes, record];
        }
        if (action === 'delete') {
          quotes = quotes.filter((m) => m.id !== record.id);
        }
      });
  });

  // Unsubscribe from realtime
  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<!-- <style>
</style> -->

<svelte:head>
  <!-- ? Are these needed? Is this the best place for them? -->
  <link
    rel="preload"
    href="/fonts/StarJedi.woff2"
    as="font"
    type="font/woff2"
  />
  <link rel="preload" href="fonts/tengtelc.woff2" as="font" type="font/woff2" />
  <link
    rel="preload"
    href="fonts/MoonDance-Regular.woff2"
    as="font"
    type="font/woff2"
  />
</svelte:head>

<div class="quotes">
  <Masonry
    gridGap={'2rem'}
    colWidth={'minmax(Min(35em, 100%), 1fr)'}
    items={quotes}
  >
    {#each quotes as quote (quote.id)}
      {@const theme = quote.expand?.author?.expand?.universe?.name.replace(
        /\s+/g,
        ''
      )}
      {#if quote.expand?.author?.name && quote.expand?.source?.title}
        <QuoteCard {theme}>
          <svelte:fragment slot="quoteText">
            {quote.text}
          </svelte:fragment>
          <svelte:fragment slot="quoteAuthor">
            {quote.expand?.author?.name}
          </svelte:fragment>
          <svelte:fragment slot="quoteSource">
            {quote.expand?.source?.title}
          </svelte:fragment>
        </QuoteCard>
      {:else if quote.expand?.author?.name}
        <QuoteCard>
          <svelte:fragment slot="quoteText">
            {quote.text}
          </svelte:fragment>
          <svelte:fragment slot="quoteAuthor">
            {quote.expand?.author?.name}
          </svelte:fragment>
        </QuoteCard>
      {:else if quote.expand?.source?.title}
        <QuoteCard>
          <svelte:fragment slot="quoteText">
            {quote.text}
          </svelte:fragment>
          <svelte:fragment slot="quoteSource">
            {quote.expand?.source?.title}
          </svelte:fragment>
        </QuoteCard>
      {/if}
    {/each}
  </Masonry>
</div>
