import type { Post } from '$utils/types';
import type { PageLoad } from './$types';

export const load = async function load({ fetch }) {
  // get the latest post
  const headers = { 'current-page': '1', 'page-size': '1' };
  const response = await fetch('/api/posts', { headers: headers });
  const output = await response.json();
  const post: Post = output.posts[0];
  return {
    title: `Home`,
    latestPost: post,
  };
} satisfies PageLoad;
