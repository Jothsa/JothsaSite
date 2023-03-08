<script lang="ts">
  import { blur } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { flipboard, typewriter } from '@svelteuidev/motion';
  export let pathname: string;
  export let duration = 500;
  // export let axis = 'x';
  export let amount = 5;
  export let opacity = 0;
  let delay = duration + 100;

  // TODO play around with easing

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

  const transitionInFlipboard = {
    easing: cubicOut,
    speed: 1,
  };
  const transitionOutFlipboard = {
    easing: cubicIn,
    duration,
  };

  const transitionInTypewriter = {
    easing: cubicOut,
    duration,
  };
  const transitionOutTypewriter = {
    easing: cubicIn,
    duration,
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
