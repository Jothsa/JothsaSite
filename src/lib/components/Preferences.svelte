<script lang="ts">
  import { theme, themes, themeMode } from '$scripts/Preferences';
  import { onMount } from 'svelte';

  let reducedMotionMessage = 'Reduce motion';
  let themeModeMessage = 'Light mode';

  function setThemeModeMessage() {
    if ($themeMode === 'light') {
      themeModeMessage = 'Dark mode';
    } else themeModeMessage = 'Light mode';
  }

  function onThemModeClick() {
    $themeMode === 'light' ? ($themeMode = 'dark') : ($themeMode = 'light');
    setThemeModeMessage();
  }
  onMount(() => {
    setThemeModeMessage();
  });
</script>

<div class="pref-container">
  <div class="prefs">
    <span class="pref-title">Preferences</span>
    <div class="pref-inputs">
      <div class="pref-buttons">
        <button id="theme-mode" type="button" on:click={onThemModeClick}
          >{themeModeMessage}</button>
      </div>
      <div class="theme-wrapper">
        <label for="themes">Theme</label>
        <select name="themes" id="themes" bind:value={$theme}>
          {#each themes as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .pref-container {
    padding: var(--space-xs);
    container: preferences / inline-size;
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

  .pref-inputs {
    display: grid;
    justify-content: center;
    gap: var(--space-xs);
    grid-auto-columns: fit-content(15ch);

    @container (inline-size > 20ch) {
      grid-auto-flow: column;
    }
  }

  .pref-buttons {
    display: grid;
    justify-content: center;
    gap: var(--space-xs);
    grid-auto-columns: fit-content(15ch);

    @container (inline-size > 20ch) {
      grid-auto-flow: column;
    }
  }

  .theme-wrapper {
    display: flex;
  }
</style>
