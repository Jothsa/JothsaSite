import type { PageLoad } from './$types';
import type { Post } from '$utils/types';

export const load = async function load({ fetch }) {
  const response = await fetch('/api/posts');
  const output = await response.json();
  const posts: Post[] = output.posts;
  const pages: number = output.pages;
  return { posts, pages, title: `Blog` };
} satisfies PageLoad;
