<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from './pocketbase';

  // TODO maybe set type
  let quotes: any[] = [];

  onMount(async () => {
    // get quotes in list format
    const quotesList = await pb.collection('quotes').getList(1, 50, {
      sort: '',
      expand: 'author,source',
    });
    quotes = quotesList.items;
  });
</script>

<div class="quotes">
  {#each quotes as quote (quote.id)}
    <div class="quote-container">
      <blockquote>
        {quote.text}
      </blockquote>
      <cite>
        <span class="quote-author">{quote.expand.author}</span> in
        <span class="quote-source">{quote.expand.source}</span>
      </cite>
    </div>
  {/each}
</div>
