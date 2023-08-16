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
    <div class="pages-links">
      {#if currentPage > 1}
        <a class="first-page" href="/blog/page/1"
          ><svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><g fill="none" fill-rule="evenodd"
              ><path
                d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
                fill="currentColor"
                d="M12.06 5.94a1.5 1.5 0 0 1 0 2.12L8.122 12l3.94 3.94a1.5 1.5 0 0 1-2.122 2.12l-5-5a1.5 1.5 0 0 1 0-2.12l5-5a1.5 1.5 0 0 1 2.122 0Zm6 0a1.5 1.5 0 0 1 0 2.12L14.122 12l3.94 3.94a1.5 1.5 0 0 1-2.122 2.12l-5-5a1.5 1.5 0 0 1 0-2.12l5-5a1.5 1.5 0 0 1 2.122 0Z" /></g
            ></svg
          ></a>
        <a class="previous-page" href={`/blog/page/${currentPage - 1}`} style={`color: var(--text-secondary);`}>
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            ><path
              d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z" /></svg>
        </a>
      {/if}
      <!-- TODO add key? (prob not needed) -->
      <!-- {#if totalPages >= 5} -->
      {#each { length: totalPages } as _, i}
        <a
          class="page-link"
          class:current={currentPage === i + 1}
          href={`/blog/page/${i + 1}`}
          ><div class="page-number">{i + 1}</div></a>
      {/each}
      <!-- {/if} -->
      {#if currentPage < totalPages}
        <a class="next-page" href={`/blog/page/${currentPage + 1}`}
          ><svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            ><path
              fill="currentColor"
              d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8l-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg
          ></a>
        <a class="last-page" href={`/blog/page/${totalPages}`}
          ><svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><g fill="none" fill-rule="evenodd"
              ><path
                d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
                fill="currentColor"
                d="M5.94 5.94a1.5 1.5 0 0 1 2.12 0l5 5a1.5 1.5 0 0 1 0 2.12l-5 5a1.5 1.5 0 0 1-2.12-2.12L9.878 12l-3.94-3.94a1.5 1.5 0 0 1 0-2.12Zm6 0a1.5 1.5 0 0 1 2.12 0l5 5a1.5 1.5 0 0 1 0 2.12l-5 5a1.5 1.5 0 0 1-2.12-2.12L15.878 12l-3.94-3.94a1.5 1.5 0 0 1 0-2.12Z" /></g
            ></svg
          ></a>
      {/if}
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

  .pages-links {
    display: flex;
    flex-direction: row;
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

    /* background: var(--text-primary);
    color: var(--primary); */
    font-size: var(--step-2);
    font-weight: 600;
    gap: var(--space-2xs-cqi);
    vertical-align: text-top;

    &.current {
      background: var(--accent);
      color: var(--text-primary);
    }

    @container pagination (inline-size < 40ch) {
      &:not(.current, .page-next, .page-previous, .page-first, .page-last) {
        display: none;
      }
    }

    @container pagination (inline-size < 30ch) {
      &:not(.current, .page-next, .page-previous) {
        display: none;
      }
    }

    & svg {
      width: var(--size);
      height: var(--size);
    }

    & .page-number {
      display: flex;
      place-items: center;
    }
  }

  .page-goto {
    display: flex;
    flex-direction: row;
  }
</style>
