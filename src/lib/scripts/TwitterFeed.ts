// import Parser from 'rss-parser';

import { number } from 'valibot';

const userName = 'gabriellaSaab_';
// don't include trailing slash! Maybe can help take care of it with URL?
const nitterInstance = 'https://nitter.privacydev.net';
const rssURL = new URL(`${nitterInstance}/${userName}/rss`);

type TwitterFeedItems = {
  content: string;
  contentSnippet: string;
  creator: string;
  // 'dc:creator': string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};

type twitterPost = {
  author: string;
  date: string;
  title: string;
  body?: string;
  postLink: string;
  images?: string[];
  retweet: boolean;
  retweetedPost?: twitterPost;
};

export async function fetchLatest(url: string, number = 4) {
  const success = false;

  return { success: success };
}

// cache and skip if already stored

export async function parseFeed(
  feed: Document,
  author: string,
  numberTweets = 4,
) {
  const tweets: twitterPost[] = [];
  const items = feed.querySelectorAll('item');
  items.forEach((item, i) => {
    if (i < numberTweets) {
      const title = item.querySelector('title')?.innerHTML;
      const date = item.querySelector('pubDate')?.innerHTML;
      const creator = item.querySelector('dc:creator')?.innerHTML;
      const description = (
        item.querySelector('description p') as HTMLParagraphElement | null
      )?.innerText;
      const imageElements = item.querySelectorAll(
        'description img',
      ) as NodeListOf<HTMLImageElement> | null;
      // should download and self host
      // should I handle or skip videos?
      const externalImageSources: string[] = [];
      imageElements?.forEach((image) => {
        externalImageSources.push(image.src);
      });
      
    }
  });
}

export async function getFeed(url: string) {
  let success = false;
  let feed: Document | null = null;
  try {
    const parser = new DOMParser();
    const res = await fetch(url);
    feed = parser.parseFromString(await res.text(), 'text/xml');
    // store cached version somewhere
    success = true;
  } catch {
    // fallback to cached version
    success = false;
  }

  return { feed: feed, success: success };
}
