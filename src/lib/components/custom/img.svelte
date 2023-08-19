<script lang="ts">
  import Img from '@zerodevx/svelte-img';
  // * Make sure to import original image src with `?as=run` query param
  // ex: import cat from '$lib/assets/cat.jpg?as=run'
  export let src: string;
  export let alt: string;
  export let loading: 'eager' | 'lazy' | undefined = 'lazy';
  export let blurEffect = true;
  export let shadow = true;
  export let containerStyle = '';

  // rn the class attribute gets added to the fallback image.
  // Reader view (in Firefox of course) sometimes displays the fallback which is not what we want
  // not sure the best way

  // TODO add more props (behind :where to allow overriding?)
</script>

<div
  class={`image-container ${!blurEffect ? `no-blur` : ``} ${
    !shadow ? `no-shadow` : ``
  }`}
  style={containerStyle}>
  <Img {src} {alt} {loading} class="fallback-image" shadow={false} />
  <div class="image-shadow">
    <Img
      {src}
      alt=""
      aria-hidden="true"
      focusable="false"
      {loading}
      class="fallback-image" />
  </div>
</div>

<style>
  /* stylelint-disable selector-type-no-unknown */
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
  /* stylelint-enable selector-type-no-unknown */

  .image-container {
    position: relative;
    inline-size: fit-content;
    block-size: fit-content;
    padding: var(--space-xs);
    isolation: isolate;
  }

  :global(.image-container :is(picture, img)) {
    object-fit: cover;
  }

  @supports (animation-timeline: view(block)) {
    :global(:root:not([data-blur='false'])) {
      & .image-container:not(.no-blur) {
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
    --shadow-offset: -1ch;
    position: absolute;
    z-index: -1;
    inset-block-end: var(--shadow-offset, -1ch);
    inset-inline-end: var(--shadow-offset, -1ch);
    animation: opacity-in-and-out linear;
    animation-timeline: --image;
    filter: blur(15px);
    opacity: 0.5;
  }

  .image-container.no-shadow .image-shadow {
    display: none;
  }
</style>
