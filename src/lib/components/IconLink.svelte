<script lang="ts">
  export let href: string;
  export let style: string = '';
  export let size: string = '2ch';
  export let label: string;
  // slot should be svg
</script>

<a class="unstyled-link" style={`--size: ${size || '2ch'};${style}`} aria-label={label} {href}><slot /></a>


<style>
a {
	display: inline-flex;
	inline-size: var(--size, 2ch);
	block-size: var(--size, 2ch);
}

svg {
	inline-size: 100%;
	block-size: 100%;
}
</style>