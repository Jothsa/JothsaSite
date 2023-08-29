import type { Post, TagsType } from '$utils/types';
import { isTag } from '$utils/types';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async function load({ params, fetch }) {
  const tagParam = params.tag;
  let tag: TagsType;

  if (isTag(tagParam)) {
    tag = tagParam;
    const headers = { 'post-tags': tag };
    const response = await fetch('/api/posts', { headers: headers });
    const output = await response.json();
    const posts: Post[] = output.posts;
    const totalPages: number = output.totalPages;

    return {
      posts,
      totalPages,
      title: tag,
      tag: tag,
    };
  } else {
    throw error(404, `Uh oh! Could not find tag ${params.tag}`);
  }
} satisfies PageLoad;
