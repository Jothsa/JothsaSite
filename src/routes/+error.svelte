<script lang="ts">
  import { page } from '$app/stores';
</script>

<main id="#content">
  <h1>{$page.status}: {$page.error?.message || `Unknown Error`}</h1>
  <p>Uh oh. Something went very wrong. Please try again.</p>
</main>
