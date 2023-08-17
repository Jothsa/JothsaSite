<script lang="ts">
  import ThemeModeButton from './ThemeModeButton.svelte';
  import IconLink from './IconLink.svelte';
</script>

<footer id="footer" class="styled-links">
  <p>
    <span class="button-wrapper">
      <ThemeModeButton />
    </span>
  </p>
  <p>
    <IconLink href="/rss.xml" label="visit my rss feed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24">
        <g fill="none">
          <path
            d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002-.071.035-.02.004-.014-.004-.071-.036c-.01-.003-.019 0-.024.006l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113-.014.002-.184.093-.01.01-.003.011.018.43.005.012.008.008.201.092c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.003-.011.018-.43-.003-.012-.01-.01-.184-.092Z" />
          <path
            fill="currentColor"
            d="M5 17a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5 3c8.837 0 16 7.163 16 16 0 .184-.003.368-.01.55a1.5 1.5 0 1 1-2.997-.1A13.4 13.4 0 0 0 18 19c0-7.18-5.82-13-13-13-.15 0-.3.003-.45.008a1.5 1.5 0 0 1-.1-2.999C4.631 3.003 4.815 3 5 3Zm0 7a9 9 0 0 1 8.98 9.599 1.5 1.5 0 1 1-2.993-.198 6 6 0 0 0-6.388-6.388 1.5 1.5 0 0 1-.197-2.993C4.6 10.007 4.799 10 5 10Z" />
        </g>
      </svg>
    </IconLink>
  </p>
  <p>
    Content copyright {new Date().getFullYear()} Jothsa, all rights reserved.
  </p>
  <p>
    Source licensed on <a href="https://github.com/Jothsa/JothsaSite">GitHub</a>
  </p>
  <p>
    <a href="#header"
      ><span class="arrow-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          ><g fill="none"
            ><path
              d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
              fill="currentColor"
              d="M13.06 3.283a1.5 1.5 0 0 0-2.12 0L5.281 8.939a1.5 1.5 0 0 0 2.122 2.122L10.5 7.965V19.5a1.5 1.5 0 0 0 3 0V7.965l3.096 3.096a1.5 1.5 0 1 0 2.122-2.122L13.06 3.283Z" /></g
          ></svg>
      </span>
      Back to top</a>
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
    display: inline-flex;
    vertical-align: middle;
  }

  .arrow-icon {
    display: inline-flex;
    inline-size: 2ch;
    vertical-align: text-bottom;
  }

  svg {
    inline-size: 100%;
    block-size: 100%;
  }
</style>
