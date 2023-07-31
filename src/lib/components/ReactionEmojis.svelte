<script lang="ts">
  import { ReactionsList } from '$scripts/Reactions';

  export let menuItemRole = true;
</script>

<ul class="reactions-fallback">
  {#each ReactionsList as r, i}
    <li class="reaction" style={`--item-num: ${i}`}>
      <button class="reaction-button" role={menuItemRole ? 'menuitem' : ''}>
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
    list-style: none;

    & .reaction {
    }
  }

  :global(:root:is(.no-popover, .no-anchor)) .reactions-fallback {
    display: flex;
  }
</style>
