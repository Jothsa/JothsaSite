// import { error } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Post } from '$utils/types';

export const load = async function load({ params, fetch }) {
  let currentPage = parseInt(params.page);
  let title = 'Blog';
  if (isNaN(currentPage)) {
    // ? is the the best way to redirect in this case?
    // redirect(303, '/blog');
    // ? or maybe just go to page 1?
    currentPage = 1;
  }
  const headers = { 'current-page': currentPage.toString(), 'page-size': '3' };
  const response = await fetch('/api/posts', { headers: headers });
  const output = await response.json();
  const posts: Post[] = output.posts;
  const totalPages: number = output.totalPages;

  if (totalPages !== 1) {
    title = `Blog - Page ${currentPage}`;
  }

  // console.log(pages);
  return {
    title: title,
    posts: posts,
    totalPages: totalPages,
    currentPage: currentPage,
  };
} satisfies PageLoad;
