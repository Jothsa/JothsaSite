<script lang="ts">
  import { theme, themes, blur } from '$scripts/Preferences';
  import ThemeModeButton from './ThemeModeButton.svelte';

  let reducedMotionMessage = 'Reduce motion';

  function onBlurChange(e: Event) {
    if ((e.currentTarget as HTMLInputElement).checked) {
      $blur = true;
    } else {
      $blur = false;
    }
    const blurAttr = $blur ? `true` : `false`;
    document.documentElement.setAttribute('data-blur', blurAttr);
    localStorage.setItem('blur', blurAttr);
  }
</script>

<div class="pref-container">
  <div class="prefs">
    <span class="pref-title">Preferences</span>
    <div class="pref-inputs">
      <div class="pref-buttons">
        <ThemeModeButton />
        <label class="input-wrapper"
          >{$blur ? `Disable` : `Enable`} blur effects<input
            type="checkbox"
            aria-labelledby="blur-label"
            bind:checked={$blur}
            on:change={(e) => onBlurChange(e)} /></label>
      </div>
      <div class="theme-wrapper">
        <label for="themes">Theme
        <select name="themes" id="themes" bind:value={$theme}>
          {#each themes as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
        </label>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .pref-container {
    padding: var(--space-xs);
    container: preferences / inline-size;
    inline-size: max(15ch, 20vw);
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
    display: flex;
    justify-content: center;
    gap: var(--space-xs);
    grid-auto-columns: fit-content(15ch);

    @container (inline-size > 20ch) {
      grid-auto-flow: column;
    }
  }

  .input-wrapper {
    display: flex;
    gap: var(--space-xs);
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
    block-size: fit-content;
  }
</style>
