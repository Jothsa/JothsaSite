<script lang="ts">
  import PreferencesControls from './PreferencesControls.svelte';
</script>

<div class="pref-container">
  <div class="prefs">
    <span class="pref-title">Preferences</span>
    <PreferencesControls />
  </div>
</div>

<style lang="postcss">
  .pref-container {
    display: flex;
    min-inline-size: clamp(15vw, 20ch, 70vw);

    flex-flow: row wrap;
    padding: var(--space-xs);

    /* container: preferences / inline-size; */
  }

  .prefs {
    display: grid;
    inline-size: fit-content;
    justify-content: center;
    text-align: center;
  }

  .pref-title {
    margin-block-end: var(--space-2xs);
    font-size: var(--step-1);
  }
</style>
