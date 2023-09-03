<script lang="ts">
  import { enhance } from '$app/forms';
  import Search from '$components/Search.svelte';
  import type { ActionData } from './$types';
  const filters = ['author', 'TODO'];
  export let form: ActionData;

  // make sure query doesn't need to be sanitized or w/e
</script>

<main id="#content">
  <div class="js-only js-search-container">
    <Search />
  </div>
  <!-- should have no-js class -->
  <div class="fallback-search-container">
    <form id="search-form" method="post" use:enhance>
      <div class="search-input-wrapper">
        <input type="search" name="query" aria-label="site search" />
        <input type="submit" value="Search" class="button-accent" />
      </div>
      <div class="filters-wrapper">
        <!-- TODO decide on heading level -->
        <h3>Filters:</h3>
        {#each filters as filter}
          <label
            >{filter}<input
              type="checkbox"
              name="filters"
              value={filter} /></label>
        {/each}
      </div>
    </form>
  </div>

  {#if form?.results}
    <div id="search-results">
      {#each form.results as result}
      <div class="search-result"><a href={result.url}>{result.meta.title}</a></div>
      {/each}
    </div>
  {/if}
</main>

<style>
  /* input {
    border: solid var(--accent) 2px;
    border-radius: 0.25ch;
    background-color: var(--secondary);
    color: var(--text-primary);
    transition: border-color 300ms;

    &[type='submit'] {
      border: none;
      background: var(--accent);
      transition: background-color 300ms;
    }

    &:is(:focus-visible, :hover) {
      border-color: var(--contrast);
      outline: none;

      &[type='submit'] {
        background-color: var(--contrast);
      }
    }
  } */

  #search-form {
    padding: var(--space-xs);

    /* display: grid; */
    gap: var(--space-s);
    grid-template:
      'filters search' auto
      'filters .' auto;
  }

  .filters-wrapper {
    display: flex;
    flex-flow: column;
    gap: var(--space-xs);
    grid-area: filters;

    & label {
      display: flex;
      flex-flow: row;
      font-size: var(--step-1);
      gap: var(--space-2xs);
    }
  }

  .search-input-wrapper {
    display: flex;
    flex-flow: row wrap;
    gap: var(--space-xs);
    grid-area: search;

    & input {
      min-inline-size: min(10ch, 100%);
    }
  }
</style>
