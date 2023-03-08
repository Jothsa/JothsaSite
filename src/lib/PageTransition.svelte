<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  export let pathname: string;
  export let duration = 300;
  let blurDuration = duration / 3;
  let delay = duration + 100;
  export let y = 10;

  const transitionInFly = {
    easing: cubicOut,
    y,
    duration: duration * 0.5,
    delay,
  };
  const transitionInBlur = {
    easing: cubicOut,
    y,
    duration: blurDuration,
    delay,
  };
  const transitionOutFly = { easing: cubicIn, y: -y, duration };
</script>

{#key pathname}
  <div in:fly={transitionInFly} out:fly={transitionOutFly}>
    <slot />
  </div>
{/key}