<script lang="ts">
  import { blur } from 'svelte/transition';
  import { quintIn, quintOut, cubicIn, cubicOut } from 'svelte/easing';
  export let pathname: string;
  export let duration = 200;
  // export let axis = 'x';
  export let amount = 5;
  export let opacity = 0;
  let delay = duration + 100;

  const transitionInBlur = {
    easing: cubicOut,
    duration,
    delay,
    amount,
    opacity,
  };
  const transitionOutBlur = {
    easing: cubicIn,
    duration,
    amount,
    opacity: opacity,
  };

  // const transitionInSlide = {
  //   easing: quintOut,
  //   duration,
  //   delay,
  //   axis,
  // };
  // const transitionOutSlide = {
  //   easing: quintIn,
  //   duration,
  //   axis,
  // };
</script>

{#key pathname}
  <div in:blur={transitionInBlur} out:blur={transitionOutBlur}>
    <slot />
  </div>
{/key}
