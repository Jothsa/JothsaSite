<div id="accessible-menu">
  <ol>
    <li><a href="#content" class="sr-only">Skip to content</a></li>
    <li><a href="#footer" class="sr-only">Skip to footer</a></li>
  </ol>
</div>

<style>
  #accessible-menu {
    position: absolute;
    inset-inline-start: 50%;
    background: var(--contrast);
    transform: translate(-50%, -100%);

    @media (prefers-reduced-motion: no-preference) {
      transition: transform 300ms ease-in-out;
    }

    &:is(:focus-within, :focus-visible) {
      transform: translate(-50%, 0);
    }

    & ol {
      padding: 0;
      margin: 0;
    }

    & a:focus-visible {
      display: flex;
      justify-content: center;
      padding-inline: 2ch;
      color: var(--text-secondary);
      font-size: 1.5rem;
      text-decoration: underline;

      &:visited {
        color: var(--text-secondary);
      }
    }
  }
</style>
