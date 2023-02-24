<script>
</script>

<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/quotes">Quotes</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>

<style lang="postcss">
  @import 'open-props/masks/edges';
  nav {
    background-color: #eee;
    padding: 0 1rem 5rem 1rem;
    width: 100vw;
    display: grid;
    place-items: center;
    -webkit-mask: var(--mask-edge-drip-bottom);

    & ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-auto-flow: column;

      & li {
        padding: 0;
      }
    }

    & a {
      text-decoration: none;
      text-align: center;
      display: inline-block;
      color: blue;
      font-size: 1.125rem;
      padding: 1rem 0.5rem;
    }
  }

  body {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
</style>
