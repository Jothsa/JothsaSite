<script lang="ts">
  import { goto } from '$app/navigation';
  import { url } from '$utils/config';
  // TODO add transitions
  /**
   * @prop pages - the total num of pages-- the last page
   */
  export let totalPages: number;
  export let currentPage: number;

  async function onGoToPageChange(e: Event) {
    const num = parseInt((e.currentTarget as HTMLInputElement)?.value);
    if (num !== currentPage && num > 0 && num <= totalPages) {
      await goto(`${url}blog/page/${num}`, {});
    }
  }
</script>

<div class="pagination-container">
  <nav class="pagination" aria-label="pagination">
    <div class="pages-links colored-links">
      {#each { length: totalPages } as _, i}
        <a
          class="page-link"
          class:first-page={1 === i + 1}
          class:previous-page={currentPage - 1 === i + 1}
          class:current={currentPage === i + 1}
          class:next-page={currentPage + 1 === i + 1}
          class:last-page={totalPages === i + 1}
          href={`/blog/page/${i + 1}`}
          ><div class="page-number">{i + 1}</div></a>
      {/each}
    </div>
    <div class="page-goto">
      <label for="page-num">Go to page</label>
      <input
        type="number"
        id="page-num"
        name="page number"
        min="1"
        max={totalPages}
        on:change={(e) => {
          onGoToPageChange(e);
        }} />
    </div>
  </nav>
</div>

<style>
  .pagination-container {
    display: flex;
    container: pagination / inline-size;
  }

  .pagination {
    display: flex;
    flex-flow: row wrap;
    gap: var(--space-s-cqi);
  }

  .pages-links {
    display: flex;
    flex-flow: row wrap;
  }

  a {
    --size: clamp(1ch, 5cqi, 3ch);
    display: inline-flex;
    inline-size: var(--size);
    block-size: var(--size);
    align-items: center;
    justify-content: center;
    padding: var(--space-3xs-cqi);
    aspect-ratio: 1;
    font-size: var(--step-2);
    font-weight: 600;
    gap: var(--space-2xs-cqi);
    vertical-align: text-top;

    &.current {
      background: var(--accent);
      color: var(--primary-text);
    }

    /* display only current and arrows */

    /* @container pagination (inline-size < 30ch) {
      &:not(.current, .page-next, .page-previous, .page-first, .page-last) {
        display: none;
      }
    } */

    /* display only current and next and previous arrows */

    /* @container pagination (inline-size < 4ch) {
      &:not(.current, .page-next, .page-previous) {
        display: none;
      }
    } */

    & svg {
      width: var(--size);
      height: var(--size);
    }

    & .page-number {
      display: flex;
      place-items: center;
    }
  }

  a:has(svg) {
    padding: 0;
  }

  .page-goto {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-3xs-cqi);

    & input {
      border: solid 2px var(--accent);
      border-radius: 15%;
      background-color: var(--secondary);
      color: var(--text-primary);
      transition: 300ms border-color;

      &:focus-visible {
        border-color: color-mix(
          in oklab,
          var(--accent),
          var(--increase-contrast) 15%
        );
      }
    }
  }
</style>
