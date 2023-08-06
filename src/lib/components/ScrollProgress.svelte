<script lang="ts">
  /**
   * @export post should be parent of this component
   */

  // for best results scroll progress should be right against the block-start edge of the parent container whose progress will be measured

  import { onMount } from 'svelte';
  import { ScrollProgress } from '$scripts/scrollProgress';
  import '$styles/scrollProgress.css';
  let post: HTMLElement | null;
  // * have to use the ID because children mount before parents so I couldn't pass the element because it wasn't defined
  export let postID: string;
  export let direction: 'top' | 'bottom' = 'top';
  export let changeOpacity = true;
  let progress: HTMLProgressElement;
  let scrollProgress: ScrollProgress;

  onMount(() => {
    post = document.getElementById(postID);
    progress = document.getElementById(
      'scroll-progress',
    ) as HTMLProgressElement;
    if (post && progress) {
      scrollProgress = new ScrollProgress(
        post,
        progress,
        direction,
        changeOpacity,
      );
    }
  });
</script>

<progress id="scroll-progress" max="100" value="0"></progress>

<style>
  /* make sure it is always in front */

  /*
   * [1] remove if changeOpacity = false; helps if js isn't loaded 
  */
  #scroll-progress {
    --height: clamp(0.75ch, 1svh, 15px);
    z-index: 5;
    block-size: var(--height);
    contain: content;
    opacity: 0; /* [1] */
    transition: opacity 150ms ease-out;
  }
</style>
