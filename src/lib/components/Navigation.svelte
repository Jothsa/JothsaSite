<script lang="ts">
  import { page } from '$app/stores';
</script>

<nav aria-label="Main Navigation" id="mainNav">
  <button
    aria-controls="mainNavMenu"
    id="mainNavMenuButton"
    aria-label="expand or collapse the main navigation menu"
    aria-expanded="false"
    ><svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      ><path
        d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1c.3-.3.8-.3 1.1 0l2.7 2.7l2.7-2.7c.3-.3.8-.3 1.1 0c.3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z" /></svg
    ></button>
  <ul id="mainNavMenu">
    <li>
      <span
        ><a
          href="/"
          rel="preload"
          aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</a
        ></span>
    </li>
    <li>
      <span
        ><a
          href="/blog"
          rel="preload"
          aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}
          >Blog</a
        ></span>
    </li>
    <li>
      <span
        ><a
          href="/about"
          rel="preload"
          aria-current={$page.url.pathname === '/about' ? 'page' : undefined}
          >About</a
        ></span>
    </li>
  </ul>
</nav>

<style lang="postcss">
  /* nav contain: inline-size
      button [aria-expanded]
      ul .expanded
        li
          span
            a [aria-current]
      ...
        li
          span
            a [aria-current]
            button [aria-expanded]
          ul .expanded
            li
              span
                a [aria-current]
            li
              span
                a [aria-current]    
      ul
        li
          span
            a [aria-current]
      ...
              */

  @property --link-grad-color-1 {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  @property --link-grad-color-2 {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  @property --nav-link-color {
    inherits: true;
    initial-value: blue;
    syntax: '<color>';
  }

  nav {
    --_font: var(--header-font), 'Carter One';
    --font-size: var(--step-2);
    --link-grad-color-1: oklch(49.56% 0.298 279);
    --link-grad-color-2: oklch(80% 0 0);
    --nav-link-color: oklch(45.2% 0.31321437166460125 264.052020638055);
    --bg-color: transparent;
    --nav-transition-time: 300;
    --underline-height: var(--space-xs);

    position: relative;
    display: grid;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    background-color: var(--bg-color);
    color: var(--nav-link-color);
    container: nav / inline-size;
    font-family: var(--_font), sans-serif;
    font-size: var(--font-size);
  }
</style>
