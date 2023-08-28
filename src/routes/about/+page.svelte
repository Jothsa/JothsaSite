<script lang="ts">
  export let data;
  const feed = data.feed;
  console.log(feed);
  console.group('feed items');
  try {
    feed.items.forEach((item) => {
      console.log(item);
    });
  } catch (e) {
    console.log(`uh oh`, e);
  }
  console.groupEnd();
</script>

<main class="styled-links" id="content">
  <p>All about meeeee</p>
</main>
