<script lang="ts">
  import Search from '$components/Search.svelte';
  import type { ActionData } from './$types';
  const filters = ['author', 'TODO'];
  export let form: ActionData;

  let searchQuery = '';

  // make sure query doesn't need to be sanitized or w/e

  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';

  async function onSubmit() {
    let currentSearchTerm = '';
    let filtersParam: string[] = [];

    if (browser) {
      const urlParams = new URLSearchParams(window.location.search);
      currentSearchTerm = urlParams.get('q') || '';
    }
    if (searchQuery.trim() === currentSearchTerm?.trim()) {
      return;
    }

    await goto(`/?q=${encodeURIComponent(searchQuery.trim())}`, {
      keepFocus: true,
    });
  }
</script>

<main id="#content">
  <div class="js-only js-search-container">
    <Search />
  </div>
  <!-- should have no-js class -->
  <div class="fallback-search-container">
    <form id="search-form">
      <div class="search-input-wrapper">
        <input type="search" name="query" aria-label="site search" />
        <button type="submit" value="Search" class="button-accent" />
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
    <ul id="search-results">
      {#each form.results as result}
        <li class="search-result">
          <a href={result.url}>{result.meta.title}</a>
        </li>
      {/each}
    </ul>
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
