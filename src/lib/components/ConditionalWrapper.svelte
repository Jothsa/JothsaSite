<script lang="ts">
  export let condition: boolean;
  export let tag: string;
  export let tagIfFalse = '';
</script>

{#if condition}
  <svelte:element this={tag} {...$$restProps}>
    <slot />
  </svelte:element>
{:else if tagIfFalse}
  <svelte:element this={tagIfFalse} {...$$restProps}>
    <slot />
  </svelte:element>
{:else}
  <slot />
{/if}
