<script lang="ts">
  /**
   * @export post should be parent of this component
   */

  import { onMount } from 'svelte';
  import { ScrollProgress } from '$scripts/scrollProgress';
  import '$styles/scrollProgress.css';
  let post: HTMLElement | null;
  // * have to use the ID because children mount before parents so I couldn't pass the element because it wasn't defined
  export let postID: string;
  export let direction: 'top' | 'bottom' = 'top';
  // should always be defined since it's part of this component
  let progress!: HTMLProgressElement;
  let scrollProgress: ScrollProgress;

  onMount(() => {
    post = document.getElementById(postID);
    progress = document.getElementById(
      'scroll-progress',
    ) as HTMLProgressElement;
    if (post && progress) {
      scrollProgress = new ScrollProgress(post, progress, direction);
    }
  });
</script>

<progress id="scroll-progress" max="100" value="0"></progress>

<style>
  /* make sure it is always in front */

  #scroll-progress {
    z-index: 1;
  }
</style>
