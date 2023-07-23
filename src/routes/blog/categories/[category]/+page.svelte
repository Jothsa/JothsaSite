<script lang="ts">
  import Categories from '$components/Categories.svelte';
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import { CategoriesList } from '$utils/types';
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import type { Categories as CategoriesType } from '$utils/types';
  export let data: PageData;

  let currentCat: CategoriesType | undefined;

  /* should prob use a regex but I'm lazy 
  I shouldn't have to worry about there being multiple categories, at least rn */
  $: {
    if ($page.url.pathname.includes('categories')) {
      CategoriesList.forEach((c) => {
        if ($page.url.pathname.includes(c)) {
          currentCat = c;
        } else {
          currentCat = undefined;
        }
      });
    }
  }
</script>

<div class="grid" id="content">
  <main>
    <PostsDisplay posts={data.posts} />
  </main>
  <div class="tags-wrapper">
    <h1>Tags</h1>
    <Categories catClasses={'compact'} {currentCat}/>
  </div>
</div>

<style>
  .grid {
    display: grid;
    gap: var(--space-l);
    grid-template-columns: repeat(2, auto);
  }
</style>
