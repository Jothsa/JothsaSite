<script lang="ts">
  export let viewTimelineName: string;
  export let style = '';

  // rn should be child of el whose progress is being tracked

  // progress = 100% when top or bottom of element has crossed viewport
  export let endOn: 'top' | 'bottom' = 'bottom';

  // NOTE webkit mask on post is cutting off progress
</script>

<div
  class={`view-progress end-on-${endOn}`}
  aria-hidden="true"
  style={`--view-timeline-name: ${viewTimelineName}; ${style}`}>
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
    --bg: linear-gradient(
      to right,
      color-mix(in oklch, var(--accent), var(--decrease-contrast) 30%),
      25%,
      var(--accent),
      75%,
      color-mix(in oklch, var(--accent), var(--increase-contrast) 50%)
    );

    /* with position: sticky, takes up space in the document flow/layout/w/e */
    position: sticky;
    z-index: 5;
    inset-block-start: 0;
    inset-inline: 0;
    display: none;
    inline-size: 100%;
    block-size: var(--height);
    border-radius: 0ch;
    animation: view-progress linear both;
    animation-range: exit-crossing 0% entry-crossing 100%;
    animation-timeline: var(--view-timeline-name);
    background: var(--bg);
    contain: content;
    transform-origin: 0 50%;

    &.end-on-top {
      animation-range: cover 0 cover 100;
    }

    @supports (
      (animation-range: exit-crossing 0% entry-crossing 100%) and
        (animation-timeline: var(--view-timeline-name)) and
        (view-timeline: --post block) and (timeline-scope: --post)
    ) {
      display: unset;
    }

    @media (prefers-reduced-motion) {
      display: none;
    }
  }
</style>
