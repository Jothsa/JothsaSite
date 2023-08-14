<nav id="accessibility-menu" aria-label="Accessibility Menu">
  <ol>
    <li role="listitem">
      <a href="#content" class="sr-only">Skip to content</a>
    </li>
    <li role="listitem">
      <a href="#footer" class="sr-only">Skip to footer</a>
    </li>
  </ol>
</nav>

<style>
  #accessibility-menu {
    position: absolute;
    inset-inline-start: 50%;
    background: var(--tertiary);
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

      & li {
        list-style: none;
      }
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
