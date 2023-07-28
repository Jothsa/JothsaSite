<script lang="ts">
  import { themeMode } from '$scripts/Preferences';
  import { onMount } from 'svelte';
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

<button id="theme-mode" type="button" on:click={onThemModeClick}
  >{themeModeMessage}</button>


  <style>
    
  </style>
