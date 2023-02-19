<script lang="ts">
  import { onMount } from 'svelte';
  import { pb } from './pocketbase';

  let quotes = [];

  onMount(async () => {
    // get quotes in list format
    const quotesList = await pb.collection('quotes').getList(1, 50, {
      sort: '',
      expand: 'author,source',
    });
    quotes = quotesList.items;
  });
</script>
