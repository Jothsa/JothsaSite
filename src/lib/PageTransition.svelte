<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  // import { reducedMotion } from '$lib/reducedMotion';
  import type { FadeParams } from 'svelte/transition';
  export let pathname: string;
  export let duration = 300;
  let delay = duration + 100;
  export let y = 10;

  const transitionInFly = {
    easing: cubicOut,
    y,
    duration: duration * 0.5,
    delay,
  };
  const transitionOutFly = { easing: cubicIn, y: -y, duration };
  // const customFade = (node: Element, params: FadeParams) =>
  //   fade(node, { duration: duration });

  // $: transitionIn = $reducedMotion ? customFade : fly;
  // $: transitionOut = $reducedMotion ? customFade : fly;
</script>

{#key pathname}
  <div in:fly={transitionInFly} out:fly={transitionOutFly}>
    <slot />
  </div>
{/key}
