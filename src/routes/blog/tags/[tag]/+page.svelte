<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  import BlogPostsLayout from '$components/BlogPostsLayout.svelte';

  $: currentTag = data.tag;
</script>

<BlogPostsLayout posts={data.posts} {currentTag} totalPages={data.totalPages} />
