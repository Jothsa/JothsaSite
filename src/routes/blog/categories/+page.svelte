<script lang="ts">
  // TODO display all categories use type array thing to generate
  import { CategoriesList } from '$utils/types';
</script>

<ul class="categories">
  {#each CategoriesList as cat}
    <li class="category"><a href={`/blog/categories/${cat}`}>{cat}</a></li>
  {/each}
</ul>
