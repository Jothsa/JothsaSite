<script lang="ts">
  // use nitter and rss parser
  // nitter is very spotty so don't expect perfection!
  // hide or keep old tweets if nitter fails
  // import Parser from 'rss-parser';

  export let userName = 'gabriellaSaab_';
  // don't include trailing slash! Maybe can help take care of it with URL?
  export let nitterInstance = 'https://nitter.privacydev.net';
  const rssURL = new URL(`${nitterInstance}/${userName}/rss`);
  let success = false;
  // const parser = new Parser();
  // const feed = await parser.parseURL(rssURL.toString());
  console.log(feed);
  console.group('feed items');
  feed.items.forEach((item) => {
    console.log(item);
  });
  console.groupEnd();

  try {
    success = true;
  } catch {
    success = false;
  }
</script>
