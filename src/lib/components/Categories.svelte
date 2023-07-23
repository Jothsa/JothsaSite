<script lang="ts">
  // TODO display all categories use type array thing to generate
  import { CategoriesList } from '$utils/types';
  import type { Categories } from '$utils/types';

  import Category from './Category.svelte';
  export let categories: Categories[] = [...CategoriesList];
  export let catClasses: 'large' | 'compact' | '' = '';
  export let currentCat: Categories | undefined = undefined;
  
</script>

<div class="categories-container">
  <ul class="categories">
    {#each categories as category}
      <Category {category} classNames={catClasses} isCurrentCat={currentCat === category} />
    {/each}
  </ul>
</div>

<style>
  .categories-container {
    min-inline-size: 100%;
    min-block-size: 100%;
    container: categories / inline-size;

    & .categories {
      display: flex;
      flex-wrap: wrap;
      padding: 0;

      /* browser default list styles are messing with this */
      margin: 0;

      /* could make s-xl pair maybe */
      gap: var(--space-s-l-cqi);
    }
  }
</style>
