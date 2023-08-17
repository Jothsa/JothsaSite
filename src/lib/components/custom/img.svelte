<script lang="ts">
  import Img from '@zerodevx/svelte-img';
  // * Make sure to import original image src with `?as=run` query param
  // ex: import cat from '$lib/assets/cat.jpg?as=run'
  export let src: string;
  export let alt: string;
  export let loading: 'eager' | 'lazy' | null | undefined = 'lazy';
</script>

<div class="image-container">
  <Img {src} {alt} {loading} />
  <div class="image-shadow">
    <Img
      {src}
      alt=""
      aria-hidden="true"
      focusable="false"
      {loading} />
  </div>
</div>

<style>
  @keyframes blur-in-and-out {
    entry-crossing 0% {
      filter: blur(var(--blur, 50px));
    }

    entry 75%,
    entry 100% {
      filter: blur(0px);
    }

    exit 0%,
    exit 25% {
      filter: blur(0px);
    }

    exit-crossing 100% {
      filter: blur(var(--blur, 50px));
    }
  }

  @keyframes opacity-in-and-out {
    entry-crossing 0% {
      opacity: 0;
    }

    entry 65%,
    entry 100% {
      opacity: var(--base-opacity, 1);
    }

    exit 0%,
    exit 35% {
      opacity: var(--base-opacity, 1);
    }

    exit-crossing 100% {
      opacity: 0;
    }
  }

  .image-container {
    position: relative;
    inline-size: fit-content;
    block-size: fit-content;
    padding: var(--space-xs);
    isolation: isolate;
  }

  @supports (animation-timeline: view(block)) {
    :global(:root:not(.no-image-blur)) {
      & .image-container {
        --blur: 10px;
        animation: blur-in-and-out linear;
        animation-timeline: --image;
        view-timeline-axis: block;
        view-timeline-name: --image;
      }
    }
  }

  .image-shadow {
    --base-opacity: 0.5;
    position: absolute;
    z-index: -1;
    inset-block-end: -1ch;
    inset-inline-end: -1ch;
    animation: opacity-in-and-out linear;
    animation-timeline: --image;
    filter: blur(15px);
    opacity: 0.5;
  }
</style>
