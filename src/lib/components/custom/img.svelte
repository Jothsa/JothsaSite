<script lang="ts">
  export let src: string;
  export let alt: string;
  // export let loading: 'eager' | 'lazy' | null | undefined = null;
  const imgURL = `/images/${src}`;
</script>

<div class="image-container">
  <img
    src={`/images/${src}`}
    {alt}
    loading="lazy"
    style={`--src: url("${imgURL}")`} />
  <img
    src={`/images/${src}`}
    class="image-shadow"
    alt=""
    aria-hidden="true"
    focusable="false"
    loading="lazy" />
</div>

<style>
  @keyframes blur-in-and-out {
    entry-crossing 0% {
      filter: blur(var(--blur, 50px));
    }

    entry 100% {
      filter: blur(0px);
    }

    exit 0% {
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

    entry 100% {
      opacity: var(--base-opacity, 1);
    }

    exit 0% {
      opacity: var(--base-opacity, 1);
    }

    exit-crossing 100% {
      opacity: 0;
    }
  }

  .image-container {
    --blur: 10px;
    position: relative;
    padding: var(--space-xs);
    animation: blur-in-and-out linear;
    animation-timeline: --image;
    isolation: isolate;
    view-timeline-axis: block;
    view-timeline-name: --image;
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
