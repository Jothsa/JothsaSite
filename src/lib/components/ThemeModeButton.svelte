<script lang="ts">
  import { themeMode, isThemeMode } from '$scripts/Preferences';
  import type { ThemeMode } from '$scripts/Preferences';
  import { onMount } from 'svelte';
  // changes the icon based on root data-theme-mode attribute
  // import './ThemeModeButton.css';
  const lightMessage = 'Set theme to light mode';
  const darkMessage = 'Set theme to dark mode';
  const autoMessage = 'Set theme to match device mode';
  let themeModeMessage = autoMessage;

  function setThemeModeMessage() {
    if ($themeMode === 'light') {
      themeModeMessage = darkMessage;
    } else if ($themeMode === 'dark') {
      themeModeMessage = autoMessage;
    } else if ($themeMode === 'auto') {
      themeModeMessage = lightMessage;
    }
  }

  function onThemModeClick() {
    if ($themeMode === 'light') {
      setThemeMode('dark');
    } else if ($themeMode === 'dark') {
      setThemeMode('auto');
    } else {
      setThemeMode('light');
    }
    document.documentElement.setAttribute('data-theme-mode', $themeMode);
    setThemeModeMessage();
  }

  function initTheme() {
    let lsThemeMode = localStorage.getItem('themeMode');
    if (isThemeMode(lsThemeMode)) {
      $themeMode = lsThemeMode;
    } else $themeMode = 'auto';
    setThemeModeMessage();
  }

  function setThemeMode(t: ThemeMode) {
    $themeMode = t;
    localStorage.setItem('themeMode', t);
  }

  onMount(() => {
    initTheme();
  });
</script>

<button
  id="theme-mode"
  type="button"
  class="theme-button"
  on:click={onThemModeClick}
  title={themeModeMessage}
  aria-label={themeModeMessage}
  ><svg
    aria-hidden="true"
    focusable="false"
    class="light-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    ><g fill="none"
      ><path
        d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
        fill="currentColor"
        d="M12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm6.364-2.05l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 1.414-1.414Zm-12.728 0a1 1 0 0 1 1.497 1.32l-.083.094l-.707.707a1 1 0 0 1-1.497-1.32l.083-.094l.707-.707ZM12 6a6 6 0 1 1 0 12a6 6 0 0 1 0-12Zm-8 5a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1Zm17 0a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM4.929 4.929a1 1 0 0 1 1.32-.083l.094.083l.707.707a1 1 0 0 1-1.32 1.497l-.094-.083l-.707-.707a1 1 0 0 1 0-1.414Zm14.142 0a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM12 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z" /></g
    ></svg>
  <svg
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
    class="dark-icon"
    viewBox="0 0 24 24"
    ><path
      fill="currentColor"
      d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142c3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z" /></svg>
  <svg
    aria-hidden="true"
    focusable="false"
    class="auto-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    ><g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      ><path d="M9.173 14.83a4 4 0 1 1 5.657-5.657" /><path
        d="m11.294 12.707l.174.247a7.5 7.5 0 0 0 8.845 2.492A9 9 0 0 1 5.642 18.36M3 12h1m8-9v1M5.6 5.6l.7.7M3 21L21 3" /></g
    ></svg>
</button>

<style>
  /*
 * [1] remove default padding that was hiding the svg
 */

  button {
    display: inline grid;
    overflow: hidden;
    inline-size: clamp(15px, 3ch, 15lvh);
    block-size: clamp(15px, 3ch, 15lvh);
    padding: 0; /* [1] */
    border: none;
    border: solid 2px var(--accent);
    border-radius: 50%;
    background: none;
    background-color: none;
    place-content: center;
    vertical-align: middle;

    & svg {
      width: 2rem;
      height: 2rem;
      fill: currentcolor;
      grid-area: 1 / 1;
      transition: opacity 300ms ease-in-out;
    }
  }

  /* why does this work without :global() ? */

  :root[data-theme-mode='light'] .theme-button :is(.dark-icon, .auto-icon),
  :root[data-theme-mode='dark'] .theme-button :is(.light-icon, .auto-icon),
  :root[data-theme-mode='auto'] .theme-button :is(.light-icon, .dark-icon) {
    display: none;
    opacity: 0;
    visibility: hidden;
  }
</style>
