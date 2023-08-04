<script lang="ts">
  import { ReactionsList } from '$scripts/Reactions';

  export let menuItemRole = true;
</script>

{#each ReactionsList as r, i}
  <li class="reaction" style={`--item-num: ${i}`}>
    <button class="reaction-button" role={menuItemRole ? 'menuitem' : ''}>
      <span
        class="reaction-emoji"
        aria-hidden="true"
        title={r.description}
        aria-label={r.description}>{r.emoji}</span>
      <span class="sr-only">{r.description}</span>
    </button>
  </li>
{/each}

<style>
  & .reaction {
  }
</style>
