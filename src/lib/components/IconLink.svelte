<script lang="ts">
  export let href: string;
  export let style: string = '';
  export let size: string = '2ch';
  export let label: string;
  // slot should be svg
</script>

<a
  class="unstyled-link"
  style={`--size: ${size || '2ch'};${style}`}
  aria-label={label}
  {href}><slot /></a>

<style>
  a {
    display: inline-flex;
    inline-size: var(--size, 2ch);
    block-size: var(--size, 2ch);
    border-radius: 0.5ch;
    color: var(--text-secondary);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    text-decoration: none;

    &:active,
    &:hover {
      color: var(--text-secondary);
    }

    &:focus-visible {
      border: none;
      outline: solid var(--contrast) clamp(2px, 0.4ch, 7px);
    }
  }

  :global(svg) {
    inline-size: 100%;
    block-size: 100%;
  }
</style>
