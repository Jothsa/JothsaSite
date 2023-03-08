<script lang="ts">
  import { blur } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  export let pathname: string;
  export let duration = 300;
  let delay = duration + 100;
  export let y = 10;

  const transitionInBlur = {
    easing: cubicOut,
    y,
    duration: duration,
    delay,
  };
  const transitionOutBlur = { easing: cubicIn, y: -y, duration };
</script>

{#key pathname}
  <div in:blur={transitionInBlur} out:blur={transitionOutBlur}>
    <slot />
  </div>
{/key}
