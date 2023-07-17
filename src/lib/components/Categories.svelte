<script lang="ts">
  // TODO display all categories use type array thing to generate
  import { CategoriesList } from '$utils/types';
  import Category from './Category.svelte';
</script>

<ul class="categories">
  {#each CategoriesList as category}
    <Category {category} />
  {/each}
</ul>

<style>
  .categories {
    display: flex;
    gap: var(--space-xl);
  }
</style>
