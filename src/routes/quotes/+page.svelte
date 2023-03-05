<script lang="ts">
  console.log('start');
  import Quotes from '$lib/quotes.svelte';
  console.log('1');
  import type { PageData } from './$types';
  console.log('2');

  export let data: PageData;
  $: ({ quotesList } = data);
</script>

<header>
  <h1>Quotes</h1>
</header>

<Quotes {quotesList} />
