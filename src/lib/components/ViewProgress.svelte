<script lang="ts">
  export let viewTimelineName: string;

  // rn should be child of el whose progress is being tracked

  // progress = 100% when top or bottom of element has crossed viewport
  export let endOn: 'top' | 'bottom' = 'bottom';
</script>

<div
  class={`view-progress end-on-${endOn}`}
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

    &.end-on-top {
      animation-range: cover 0 cover 100;
    }

    @supports (
      (animation-range: exit-crossing 0% entry-crossing 100%) and
        (animation-timeline: var(--view-timeline-name)) and
        (view-timeline: --post block)
    ) {
      display: unset;
    }
  }
</style>
