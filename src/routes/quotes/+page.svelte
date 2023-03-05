<script lang="ts">
  import Quotes from '../../lib/quotes.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<header>
  <h1>Quotes</h1>
</header>

<Quotes data.quotesList />
