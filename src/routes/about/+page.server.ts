// ! remember to swap back to regular load and prerender
import type { PageServerLoad } from './$types';
import Parser from 'rss-parser';
import feedString from '$lib/feed.txt?raw';

// const userName = 'gabriellaSaab_';
// don't include trailing slash! Maybe can help take care of it with URL?
// const nitterInstance = 'https://nitter.privacydev.net';
// const rssURL = new URL(`${nitterInstance}/${userName}/rss`);
const parser = new Parser();
const feed = await parser.parseString(feedString);
console.log(feed);
try {
  feed.items.forEach((item) => {
    console.log(item);
  });
} catch (e) {
  console.log(e);
}


export const load = (() => {
  return {
    title: `About`,
    feed: feed,
  };
}) satisfies PageServerLoad;
