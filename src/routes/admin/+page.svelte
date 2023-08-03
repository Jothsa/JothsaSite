<script lang="ts">
</script>

<nav class="admin-nav styled-links" aria-label="admin navigation">
  <ul>
    <li><a href="/admin">Admin Home</a></li>
    <li>
      <span>Create</span>
      <ul>
        <li><a href="/admin/create/post">Post</a></li>
        <li><a href="/admin/create/blurb">Blurb</a></li>
      </ul>
    </li>
    <li><a href="/admin/settings">Settings</a></li>
  </ul>
</nav>

<main>
  <p>Welcome, Jothsa!</p>
</main>

<style>
  .admin-nav {
    & * {
      outline: blue 1px solid;
    }

    & ul {
      display: flex;
      inline-size: fit-content;
      flex-direction: row;
      gap: var(--space-xs);
      list-style: none;

      & li:has(ul) {
        position: relative;
      }

      & li ul {
        position: absolute;
        inset-block-start: 2ch;
        inset-inline-end: 0;
        display: flex;
        inline-size: fit-content;
        flex-direction: column;
        padding: 0;
        margin: 0;
        gap: var(--space-2xs);
      }
    }
  }
</style>
