<script lang="ts">
  import PostCard from '$components/PostCard.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<main class="styled-links" id="content">
  <p>Welcome to my website!</p>
  <aside>
    <h2 class="h3">Check out my latest blog post</h2>
    <PostCard post={data.latestPost} wrapperTag="div" isLIRole={false} loading="eager" />
  </aside>
</main>

<style>
  main {
    display: grid;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
  }

  aside {
    display: grid;
    width: fit-content;
  }
</style>
