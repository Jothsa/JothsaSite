<script lang="ts">
  import Search from './Search.svelte';

  let searchButton: HTMLButtonElement;
  let searchDialog: HTMLDialogElement;
  // used to check if clicked inside or out for light dismiss

  const searchDialogSelector = '#search-dialog';
  export let buttonStyle = '';

  // on mobile should be modal ( as long as it fills the screen, it's prob ok to use popover="auto")
  // close button will always be there of course
  // prob should be popover on desktop
  // on desktop only needs to take up middle of screen, click outside should close
  // when no js redirect to search page or provide form
  // to prevent scrolling the body make the modal a screen-size element w/transparent bg and the search area can be inside it
  // or just leave it

  // consider using more classes instead of ids

  /**
   * this handles light dismiss
   * Make sure the visible area you don't want click to dismiss is in a child element
   */
  function handleDialogClick(e: MouseEvent) {
    if ((e.target as HTMLElement | null)?.nodeName === 'DIALOG') {
      closeModal('light dismiss');
    }
  }
  function openModal() {
    searchDialog.showModal();
  }

  function closeModal(returnVal?: string) {
    if (returnVal) {
      searchDialog.close(returnVal);
    } else {
      searchDialog.close();
    }
  }
</script>

<button
  class="icon-only-button js-only"
  id="search-button"
  on:click={openModal}
  bind:this={searchButton}
  aria-label="open search modal"
  style={buttonStyle}
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
    ><g fill="none" fill-rule="evenodd"
      ><path
        d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
        fill="currentColor"
        d="M5.5 10a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0ZM10 2.5a7.5 7.5 0 1 0 4.136 13.757l4.803 4.804a1.5 1.5 0 0 0 2.122-2.122l-4.804-4.803A7.5 7.5 0 0 0 10 2.5Z" /></g
    ></svg
  ></button>
<div class="no-js" id="search-fallback">
  <a class="icon-only-button no-js" href="/search" aria-label="search"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      ><g fill="none" fill-rule="evenodd"
        ><path
          d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
          fill="currentColor"
          d="M5.5 10a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0ZM10 2.5a7.5 7.5 0 1 0 4.136 13.757l4.803 4.804a1.5 1.5 0 0 0 2.122-2.122l-4.804-4.803A7.5 7.5 0 0 0 10 2.5Z" /></g
      ></svg
    ></a>
</div>

<!-- should be ok. The browser should take care of these events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  class="js-only"
  id="search-dialog"
  bind:this={searchDialog}
  on:click={handleDialogClick}>
  <div class="modal-content">
    <button
      class="icon-only-button"
      aria-label="close search modal"
      on:click={() => {
        closeModal('button close');
      }}
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><g fill="none" fill-rule="evenodd"
          ><path
            d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
            fill="currentColor"
            d="m12 14.121l5.303 5.304a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.303a1.5 1.5 0 1 0 2.122 2.122L12 14.12Z" /></g
        ></svg
      ></button>
    <Search></Search>
  </div>
</dialog>

<style>

  a,
  button {
    --size: 3ch;
    --color: var(--accent);
  }

  #search-dialog {
    position: fixed;
    display: none;
    inline-size: 100dvi;

    /* needed to reset user agent styles */
    max-inline-size: 100dvi;
    block-size: 100dvb;
    max-block-size: 100dvb;
    padding: var(--space-xs);
    border: none;
    margin: 0;
    inset: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    background: var(--secondary);
    border-radius: 0.25ch;

    &[open] {
      display: grid;
    }

    &::backdrop {
      backdrop-filter: blur(5px);
    }
  }

  /* should prob be same breakpoint as nav menu and the content div below */

  @media (width > 50ch) {
    #search-dialog {
      inset: unset;
      /* stylelint-disable-next-line order/properties-order */
      inset-block-start: clamp(0ch, 1ch, 5svh);
      inline-size: clamp(50svi, 100ch, 95svi);
      block-size: clamp(50svb, 85ch, 95dvb);

      /* using left since translate x */
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .modal-content {
    /* inline-size: 100dvi; */

    /* should prob be same breakpoint as nav menu */

    /* block-size: 100dvb; */

    padding: 0;
    margin: 0;
    overscroll-behavior: contain;
  }

  /* make sure works, make sure overrides the <noscript> style in the head */
  :root:is(.no-popover, .no-anchor) {
    & :is(#search-dialog, #search-button) {
      display: none;
    }

    & #search-fallback {
      display: unset;
    }
  }
</style>
