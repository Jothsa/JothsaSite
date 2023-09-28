<script lang="ts">
  import ThemeModeButton from './ThemeModeButton.svelte';
  import IconLink from './IconLink.svelte';
  import SocialIcons from './SocialIcons.svelte';
  import Preferences from './PreferencesControls.svelte';
  import PreferencesControls from './PreferencesControls.svelte';
</script>

<footer id="footer" class="styled-links">
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
  <SocialIcons
    socials={{
      twitterUsername: 'gabriellasaab_',
      // githubUsername: 'jothsa',
      youtubeUsername: 'firebase',
      facebookUsername: 'gabriellasaab',
      goodreadsURL:
        'https://www.goodreads.com/author/show/21120217.Gabriella_Saab',
      instagramUsername: 'gabriellasaab',
      linkedinUsername: 'gabriellasaab',
      rssURL: '/rss.xml',
    }} />
  <div class="prefs-fallback-wrapper">
    <PreferencesControls />
  </div>
</footer>

<style>
  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: var(--space-2xs);
    gap: var(--space-s);
    view-transition-name: footer;
  }


  .arrow-icon {
    display: inline-flex;
    inline-size: 2ch;
    vertical-align: middle;
  }

  svg {
    inline-size: 100%;
    block-size: 100%;
  }

  .prefs-fallback-wrapper {
    display: none;
  }

  :global(:root:is(.no-popover)) .prefs-fallback-wrapper {
    display: unset;
  }
</style>
