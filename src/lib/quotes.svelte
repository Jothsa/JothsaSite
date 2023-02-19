<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { pb } from '../lib/pocketbase';
  import QuoteCard from './quoteCard.svelte';

  // TODO maybe set type
  let quotes: any[] = [];
  let newQuote: string;
  let unsubscribe: () => void;

  onMount(async () => {
    // get quotes in list format
    const quotesList = await pb.collection('quotes').getList(1, 50, {
      // sort: '',
      expand: 'author,source',
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
          record.expand = { author, source };
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

<div class="quotes">
  {#each quotes as quote (quote.id)}
    {@debug quote}
    {#if quote.expand?.author?.name && quote.expand?.source?.title}
      <QuoteCard>
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
</div>
