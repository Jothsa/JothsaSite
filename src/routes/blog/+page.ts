import { defaultPostsPerPage } from '$utils/config';
import type { PageLoad } from './$types';
import type { Post } from '$utils/types';

// export const load = async function load({ fetch }) {
//   const response = await fetch('/api/posts');
//   const output = await response.json();
//   const posts: Post[] = output.posts;
//   const pages: number = output.pages;
//   return { posts, pages, title: `Blog` };
// } satisfies PageLoad;

export const load = async function load({ fetch }) {
  const currentPage = 1;
  let title = 'Blog';
  const headers = {
    'current-page': currentPage.toString(),
    'page-size': defaultPostsPerPage.toString(),
  };
  const response = await fetch('/api/posts', { headers: headers });
  const output = await response.json();
  const posts: Post[] = output.posts;
  const totalPages: number = output.totalPages;

  if (totalPages !== 1) {
    title = `Blog - Page ${currentPage}`;
  }

  return {
    title: title,
    posts: posts,
    totalPages: totalPages,
    currentPage: currentPage,
  };
} satisfies PageLoad;
