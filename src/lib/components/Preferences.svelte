<script lang="ts">
  import {
    theme,
    themes,
    themeMode,
    isReducedMotion,
    funLevel,
  } from '$scripts/Preferences';
  import { onMount } from 'svelte';

  let reducedMotionMessage = 'Reduce motion';
  let themeModeMessage = 'Light mode';

  function setReducedMotionMessage() {
    if ($isReducedMotion) {
      reducedMotionMessage = 'Stop reducing motion';
    } else reducedMotionMessage = 'Reduce motion';
  }
  function setThemeModeMessage() {
    if ($themeMode === 'light') {
      themeModeMessage = 'Dark mode';
    } else themeModeMessage = 'Light mode';
  }
  function onReduceMotionClick() {
    $isReducedMotion = !$isReducedMotion;
    setReducedMotionMessage();
  }
  function onThemModeClick() {
    $themeMode === 'light' ? ($themeMode = 'dark') : ($themeMode = 'light');
    setThemeModeMessage();
  }
  onMount(() => {
    setReducedMotionMessage();
    setThemeModeMessage();
  });
</script>

<div class="pref-container">
  <div class="prefs">
    <span class="pref-title">Preferences</span>
    <div class="pref-inputs">
      <div class="pref-buttons">
        <button id="reduce-motion" type="button" on:click={onReduceMotionClick}
          >{reducedMotionMessage}</button>
        <button id="theme-mode" type="button" on:click={onThemModeClick}
          >{themeModeMessage}</button>
      </div>
      <div class="fun-wrapper">
        <label for="fun-level">Fun level</label>
        <input
          type="range"
          name="fun level"
          id="fun-level"
          min="0"
          max="3"
          step="1"
          bind:value={$funLevel} />
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
