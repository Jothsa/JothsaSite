<script lang="ts">
  export let title: string;
  export let theme: 'happy' | 'upset' | '' = '';

  // TODO finish
</script>

<!-- TODO fix markup -->
<div class="blurb-container {theme}">
  <div class="blurb">
    <h1>{title}</h1>
    <p><slot /></p>
  </div>
</div>

<style>
  .blurb-container {
    container: blurb / inline-size;
  }

  .blurb {
    display: grid;

    @container (inline-size > 30ch) {
      /* TD */
    }
  }
</style>
