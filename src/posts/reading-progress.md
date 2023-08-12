---
title: Reading Progress
description: A performant reading progress bar
date: '2023-08-10'
tags:
  - programming
published: true
---

Here's how I made a reading progress bar that was performant and reached 100% when the _bottom_ of the post comes into view. I am using view-timeline animations so it will be very performant. Most of the code is from [this article from chrome developers](https://developer.chrome.com/articles/scroll-driven-animations/). I bundled everything into a reusable svelte component as well. Most of the code is self explanatory. To make the progress reach 100% when the bottom of the element was in view I used `animation-range`.

I used a div with position fixed to display the progress and transformed it with the view-timeline driven animation.

```svelte
<script lang="ts">
  export let viewTimelineName: string;

  // rn should be child of el whose progress is being tracked

  // progress = 100% when top or bottom of element has crossed viewport
  export let endOn: 'top' | 'bottom' = 'bottom'; // TODO
  let supports = false;
</script>

<div
  class={`view-progress ${endOn} supports-${supports}`}
  aria-hidden="true"
  style={`--view-timeline-name: ${viewTimelineName}`}>
</div>

<style>
  @keyframes view-progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  .view-progress {
    --height: clamp(0.75ch, 1svh, 15px);

    position: fixed;
    z-index: 5;
    inset-block-start: 0;
    inset-inline: 0;
    display: none;
    block-size: var(--height);
    border-radius: 99ch;
    animation: view-progress linear both;
    animation-range: exit-crossing 0% entry-crossing 100%;
    animation-timeline: var(--view-timeline-name);
    background-color: var(--accent);
    contain: content;
    transform-origin: 0 50%;

    @supports (
      (animation-range: exit-crossing 0% entry-crossing 100%) and
        (animation-timeline: var(--view-timeline-name)) and
        (view-timeline: --post block)
    ) {
      display: unset;
    }
  }
</style>
```

Link to full component on GitHub here.
