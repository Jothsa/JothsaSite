<script lang="ts">
  import ReactionEmojiListItems from './ReactionEmojiListItems.svelte';
</script>

<ul class="reactions-fallback">
 <ReactionEmojiListItems />
</ul>

<style>
  .reactions-fallback {
    display: none;
    flex-direction: row;
    flex-wrap: wrap;
    container: reactions-fallback / inline-size;
    gap: var(--space-xs-cqi);
    list-style: none;
  }

  :global(:root:is(.no-popover, .no-anchor)) .reactions-fallback {
    display: flex;
  }
</style>
