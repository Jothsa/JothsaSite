<script lang="ts">
  import ThemeModeButton from './ThemeModeButton.svelte';
</script>

<footer id="footer" class="styled-links">
  <p>
    <span class="button-wrapper">
      <ThemeModeButton />
    </span>
    Content copyright {new Date().getFullYear()} Jothsa, all rights reserved.
    <a href="#header">Back to top</a>
  </p>
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    padding-block: var(--space-2xs);
    gap: var(--space-s);
  }

  .button-wrapper {
    padding-inline: var(--space-2xs);
    vertical-align: text-bottom;
  }
</style>
