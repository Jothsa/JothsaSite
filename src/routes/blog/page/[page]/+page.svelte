<script lang="ts">
  import BlogPostsLayout from '$components/BlogPostsLayout.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
  // destructing messes with reactivity
</script>

<!-- TODO add async block things -->

<BlogPostsLayout
  posts={data.posts}
  totalPages={data.totalPages}
  currentPage={data.currentPage} />
