<script lang="ts">
  import Img from '@zerodevx/svelte-img';
  import { onMount } from 'svelte';
  import Page from '../../routes/+page.svelte';

  interface CarouselImage {
    src: string;
    alt: string;
    text: string;
    loading?: 'eager' | 'lazy';
    style?: string;
  }

  export let images: CarouselImage[];
  export let carouselTitle: string;
  let currentImage: number;
  const numImages = images.length;

  onMount(() => {});

  function moveRight() {
    if (currentImage === numImages - 1) {
      currentImage = 1;
    } else {
      currentImage = currentImage + 1;
    }
  }

  function moveLeft() {
    if (currentImage === 11) {
      currentImage = numImages - 1;
    } else {
      currentImage = currentImage - 1;
    }
  }
</script>

<section >
  <button id="carousel-left" on:click={moveLeft}>ArrowLeft</button>
  <button id="carousel-right" on:click={moveRight}>ArrowRight</button>
  {#each images as image, i}
    <div class="carousel-panel" id={`carousel-panel-${i + 1}`} class:current>
      <Img
        class="carousel-image"
        id={`carousel-image-${i + 1}`}
        src={image.src}
        alt={image.alt}
        loading={image.loading === undefined ? `lazy` : image.loading} />
    </div>
  {/each}
</section>

<style>
</style>
