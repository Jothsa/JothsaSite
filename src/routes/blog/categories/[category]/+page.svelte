<script lang="ts">
  import PostsDisplay from '$components/PostsDisplay.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<!-- Posts -->
<PostsDisplay posts={data.posts} />
