<script lang="ts">
  export let socials: SocialsType;

  type SocialsType = {
    twitterUsername?: string;
    facebookUsername?: string;
    githubUsername?: string;
    linkedinUsername?: string;
    instagramUsername?: string;
    youtubeUsername?: string;
    goodreadsURL?: string;
    rssURL?: string;
  };

  // add option to include name of social network in the link along with icon

  const linkClasses = `icon-only-button unstyled-link`;
</script>

<div class="social-buttons-container flex-row">
  {#if socials.twitterUsername}
    <a
      href={`https://twitter.com/${socials.twitterUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="twitter"
      title="Twitter">
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M22.212 5.656a8.384 8.384 0 0 1-2.401.658A4.195 4.195 0 0 0 21.649 4c-.82.488-1.719.83-2.655 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.621-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.739 2.731 1.86 3.481a4.169 4.169 0 0 1-1.894-.523v.051a4.185 4.185 0 0 0 3.355 4.102a4.205 4.205 0 0 1-1.89.072A4.185 4.185 0 0 0 8.02 16.65a8.394 8.394 0 0 1-6.192 1.732a11.831 11.831 0 0 0 6.41 1.88c7.694 0 11.9-6.373 11.9-11.9c0-.18-.004-.362-.012-.541a8.497 8.497 0 0 0 2.086-2.164Z" /></svg>
    </a>
  {/if}
  {#if socials.facebookUsername}
    <a
      href={`https://facebook.com/${socials.facebookUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="facebook"
      title="Facebook">
      <svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M12.001 2c-5.523 0-10 4.477-10 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89c1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10Z" /></svg
      ></a>
  {/if}
  {#if socials.githubUsername}
    <a
      href={`https://github.com/${socials.githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="github"
      title="Github"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z" /></svg
      ></a>
  {/if}
  {#if socials.linkedinUsername}
    <a
      href={`https://linkedin.com/in/${socials.linkedinUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="linkedin"
      title="Linkedin"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" /></svg
      ></a>
  {/if}
  {#if socials.instagramUsername}
    <a
      href={`https://instagram.com/${socials.instagramUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="instagram"
      title="Instagram"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z" /></svg
      ></a>
  {/if}
  {#if socials.youtubeUsername}
    <a
      href={`https://youtube.com/${socials.youtubeUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="youtube"
      title="Youtube"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M12.244 4c.534.003 1.87.016 3.29.073l.504.022c1.429.067 2.857.183 3.566.38c.945.266 1.687 1.04 1.938 2.022c.4 1.56.45 4.602.456 5.339l.001.152v.174c-.007.737-.057 3.78-.457 5.339c-.254.985-.997 1.76-1.938 2.022c-.709.197-2.137.313-3.566.38l-.504.023c-1.42.056-2.756.07-3.29.072l-.235.001h-.255c-1.13-.007-5.856-.058-7.36-.476c-.944-.266-1.687-1.04-1.938-2.022c-.4-1.56-.45-4.602-.456-5.339v-.326c.006-.737.056-3.78.456-5.339c.254-.985.997-1.76 1.939-2.021c1.503-.419 6.23-.47 7.36-.476h.489ZM9.999 8.5v7l6-3.5l-6-3.5Z" /></svg
      ></a>
  {/if}
  {#if socials.goodreadsURL}
    <a
      href={`${socials.goodreadsURL}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="goodreads"
      title="Goodreads"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="448"
        height="512"
        viewBox="0 0 448 512"
        ><path
          fill="currentColor"
          d="M299.9 191.2c5.1 37.3-4.7 79-35.9 100.7c-22.3 15.5-52.8 14.1-70.8 5.7c-37.1-17.3-49.5-58.6-46.8-97.2c4.3-60.9 40.9-87.9 75.3-87.5c46.9-.2 71.8 31.8 78.2 78.3zM448 88v336c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56V88c0-30.9 25.1-56 56-56h336c30.9 0 56 25.1 56 56zM330 313.2s-.1-34-.1-217.3h-29v40.3c-.8.3-1.2-.5-1.6-1.2c-9.6-20.7-35.9-46.3-76-46c-51.9.4-87.2 31.2-100.6 77.8c-4.3 14.9-5.8 30.1-5.5 45.6c1.7 77.9 45.1 117.8 112.4 115.2c28.9-1.1 54.5-17 69-45.2c.5-1 1.1-1.9 1.7-2.9c.2.1.4.1.6.2c.3 3.8.2 30.7.1 34.5c-.2 14.8-2 29.5-7.2 43.5c-7.8 21-22.3 34.7-44.5 39.5c-17.8 3.9-35.6 3.8-53.2-1.2c-21.5-6.1-36.5-19-41.1-41.8c-.3-1.6-1.3-1.3-2.3-1.3h-26.8c.8 10.6 3.2 20.3 8.5 29.2c24.2 40.5 82.7 48.5 128.2 37.4c49.9-12.3 67.3-54.9 67.4-106.3z" /></svg
      ></a>
  {/if}
  {#if socials.rssURL}
    <a
      href={`${socials.rssURL}`}
      target="_blank"
      rel="noopener noreferrer"
      class={linkClasses}
      aria-label="RSS feed"
      title="RSS Feed"
      ><svg
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        ><g fill="none"
          ><path
            d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path
            fill="currentColor"
            d="M5 17a2 2 0 1 1 0 4a2 2 0 0 1 0-4ZM5 3c8.837 0 16 7.163 16 16c0 .184-.003.368-.01.55a1.5 1.5 0 1 1-2.997-.1A13.4 13.4 0 0 0 18 19c0-7.18-5.82-13-13-13c-.15 0-.3.003-.45.008a1.5 1.5 0 0 1-.1-2.999C4.631 3.003 4.815 3 5 3Zm0 7a9 9 0 0 1 8.98 9.599a1.5 1.5 0 1 1-2.993-.198a6 6 0 0 0-6.388-6.388a1.5 1.5 0 0 1-.197-2.993C4.6 10.007 4.799 10 5 10Z" /></g
        ></svg
      ></a>
  {/if}
</div>

<style>
</style>
