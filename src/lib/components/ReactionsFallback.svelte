<script lang="ts">
  import { ReactionsList } from '$scripts/Reactions';
</script>

<ul class="reactions-fallback">
  {#each ReactionsList as r}
    <li class="reaction">
      <button class="reaction-button">
        <span class="reaction-emoji" aria-hidden="true" title={r.description}
          >{r.emoji}</span>
        <span class="sr-only">{r.description}</span>
      </button>
    </li>
  {/each}
</ul>

<style>
  .reactions-fallback {
    display: none;
    flex-direction: row;
    flex-wrap: wrap;
    container: reactions-fallback / inline-size;
    gap: var(--space-xs-cqi);
    list-style: none;

    & .reaction {
    }
  }

  :global(:root:is(.no-popover, .no-anchor)) .reactions-fallback {
    display: flex;
  }
</style>
