<script lang="ts">
  import {
    theme,
    themes,
    blur,
    isForcedReducedMotion,
    isDeviceReducedMotion,
    isTheme,
  } from '$scripts/Preferences';
  import ThemeModeButton from './ThemeModeButton.svelte';
  import { onMount } from 'svelte';
  let themeSelectEl: HTMLSelectElement;

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
  function onReducedMotionChange(e: Event) {
    if (
      (e.currentTarget as HTMLInputElement).checked &&
      !isDeviceReducedMotion()
    ) {
      $isForcedReducedMotion = false;
    } else {
      $isForcedReducedMotion = true;
    }
    const rmAttr = $isForcedReducedMotion ? `true` : `false`;
    document.documentElement.setAttribute('data-force-reduced-motion', rmAttr);
    localStorage.setItem('force-reduced-motion', rmAttr);
  }

  function onThemeChange(e: Event) {
    const t = (e.currentTarget as HTMLSelectElement).value;
    if (isTheme(t)) {
      $theme = t;
    }
    localStorage.setItem('theme', $theme);
    document.documentElement.setAttribute('data-theme', $theme);
  }

  onMount(() => {
    if (localStorage.getItem('force-reduced-motion') === 'true') {
      $isForcedReducedMotion = true;
    } else {
      $isForcedReducedMotion = false;
    }
    const localTheme = localStorage.getItem('theme');
    if (isTheme(localTheme)) {
      $theme = localTheme;
    } else {
      $theme = 'normal';
    }
    document.documentElement.setAttribute('data-theme', $theme);
    themeSelectEl.value = $theme;
  });
</script>

<div class="pref-container">
  <div class="prefs">
    <span class="pref-title">Preferences</span>
    <div class="pref-inputs">
      <ThemeModeButton />
      <label class="input-wrapper"
        >{$blur ? `Disable` : `Enable`} blur effects<input
          type="checkbox"
          bind:checked={$blur}
          on:change={(e) => onBlurChange(e)} /></label>

      <label class="input-wrapper"
        >{$isForcedReducedMotion ? `Force` : `Match device`} reduced motion
        <input
          type="checkbox"
          on:change={(e) => onReducedMotionChange(e)} /></label>

      <label for="themes"
        >Theme
        <select
          name="themes"
          id="themes"
          bind:this={themeSelectEl}
          on:change={(e) => {
            onThemeChange(e);
          }}>
          {#each themes as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </label>
    </div>
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

  .pref-inputs {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
  }

  .input-wrapper {
    display: flex;
    min-inline-size: fit-content;
    flex-flow: row;
    gap: var(--space-3xs);
  }

  .theme-wrapper {
    display: flex;
    block-size: fit-content;
  }
</style>
