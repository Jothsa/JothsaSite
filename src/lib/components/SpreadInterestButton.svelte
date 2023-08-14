<script lang="ts">
  import { description } from '$utils/config';
  import { onMount } from 'svelte';
  let button: HTMLButtonElement;

  export let shareTitle: string | undefined = undefined;
  export let shareText: string | undefined = undefined;
  export let shareURL: string | undefined = undefined;

  onMount(() => {
    console.log('mount');
    if (!navigator?.share) {
      button.classList.add('unsupported');
    }
  });

  async function onShareButtonClick() {
    // I just check here since I can't use document and window anyway

    if (shareTitle === undefined) {
      shareTitle = document.title;
    }

    if (shareText === undefined) {
      shareText = description;
    }

    if (shareURL === undefined) {
      shareURL = window.location.href;
    }

    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareURL,
    };

    if (navigator?.share && navigator?.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(`Web Share failed.`, shareData);
    }
  }
</script>

<!--
  @component
  This is a share button which using the Web Share API
  If the API is not supported, the button will not be displayed
  Calling it "ShareButton" was getting it blocked by my ad blocker, hence the name change (not sure if that would change when built/minified)
-->

<button
  aria-label="share this page"
  title="share this page"
  bind:this={button}
  on:click={onShareButtonClick}
  ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
    ><path
      fill="currentColor"
      d="M31.605 6.838a1.25 1.25 0 0 0-2.105.912v5.472c-.358.008-.775.03-1.24.072c-1.535.142-3.616.526-5.776 1.505c-4.402 1.995-8.926 6.374-9.976 15.56a1.25 1.25 0 0 0 2.073 1.075c4.335-3.854 8.397-5.513 11.336-6.219a17.713 17.713 0 0 1 3.486-.497l.097-.003v5.535a1.25 1.25 0 0 0 2.105.912l12-11.25a1.25 1.25 0 0 0 0-1.824l-12-11.25Zm-.999 8.904l.02.002h.002h-.001A1.25 1.25 0 0 0 32 14.5v-3.865L40.922 19L32 27.365V23.5c0-.63-.454-1.16-1.095-1.24h-.003l-.004-.001l-.01-.001l-.028-.003a8.425 8.425 0 0 0-.41-.03a13.505 13.505 0 0 0-1.134-.006c-.966.034-2.33.17-3.983.566c-2.68.643-6.099 1.971-9.778 4.653c1.486-6.08 4.863-8.958 7.96-10.362c1.841-.834 3.635-1.168 4.975-1.292c.668-.062 1.216-.07 1.591-.064a9.837 9.837 0 0 1 .525.022ZM12.25 8A6.25 6.25 0 0 0 6 14.25v21.5A6.25 6.25 0 0 0 12.25 42h21.5A6.25 6.25 0 0 0 40 35.75V33.5a1.25 1.25 0 0 0-2.5 0v2.25a3.75 3.75 0 0 1-3.75 3.75h-21.5a3.75 3.75 0 0 1-3.75-3.75v-21.5a3.75 3.75 0 0 1 3.75-3.75h8.25a1.25 1.25 0 1 0 0-2.5h-8.25Z" /></svg
  ></button>

<style>
  button {
    --size: 5ch;
    display: inline-grid;
    inline-size: var(--size);
    block-size: var(--size);
    padding: 0.5ch;
    border: none;
    border-radius: 50%;
    margin: 0;
    aspect-ratio: 1;
    background: var(--tertiary);
    color: var(--text-secondary);
    place-content: center;

    &.unsupported {
      display: none;
    }
  }

  svg {
    display: inline-block;
    width: var(--size);
    height: var(--size);
    padding: 0;
    margin: 0;
    grid-area: 1/1;
  }
</style>
