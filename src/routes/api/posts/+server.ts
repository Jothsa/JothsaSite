//? Should this be here or in the +page.server
// TODO Make sure 0 is falsy
import { json } from '@sveltejs/kit';
import { getPostsByTag, getPosts } from '$scripts/GetContent';
import { getPaginatedPosts } from '$scripts/GetContent';
import { defaultPostsPerPage } from '$utils/config';
import { isTags } from '$utils/types';
import type { Post } from '$utils/types';
import type { RequestHandler } from './$types';
import type { TagsType } from '$utils/types';

export const GET = (async ({ request }) => {
  let posts: Post[] = await getPosts();
  // post-tags header should be a comma separated list or single value (or null)
  let tags: TagsType[] | null = null;
  let currentPage: number = 1;
  let pageSize = defaultPostsPerPage;
  let headerTags: string[] = [];
  let totalPages = 1;
  const headerTagsRaw = request.headers.get('post-tags');
  const headerCurrentPageRaw = request.headers.get('current-page');
  const headerPageSizeRaw = request.headers.get('page-size');

  if (headerCurrentPageRaw) {
    currentPage = parseInt(headerCurrentPageRaw);
    if (isNaN(currentPage)) {
      currentPage = 1;
    }
  }
  if (headerPageSizeRaw) {
    pageSize = parseInt(headerPageSizeRaw);
    if (isNaN(pageSize)) {
      pageSize = defaultPostsPerPage;
    }
  }

  // TODO could clean up this logic
  if (headerTagsRaw) {
    if (headerTagsRaw && headerTagsRaw.includes(',')) {
      headerTags = headerTagsRaw?.split(',');
    } else if (headerTagsRaw) {
      headerTags = [headerTagsRaw];
    }
    if (isTags(headerTags)) {
      tags = headerTags;
    }
  }
  if (currentPage && tags) {
    const output = await getPostsByTag(tags, pageSize, currentPage);
    // TODO check if these checks are needed
    // TODO Type these things (funcs, res, etc) better
    if (Array.isArray(output)) {
      posts = output;
    } else {
      posts = output.posts;
      totalPages = output.totalPages;
    }
  } else if (currentPage) {
    const output = await getPaginatedPosts(pageSize, currentPage);
    posts = output.posts;
    totalPages = output.totalPages;
  } else if (tags) {
    const output = await getPostsByTag(tags);
    if (Array.isArray(output)) {
      posts = output;
    } else {
      posts = output.posts;
      totalPages = output.totalPages;
    }
  }
  console.log('p', currentPage)
  console.log('tp', totalPages);

  return json({ posts, totalPages: totalPages });
}) satisfies RequestHandler;
