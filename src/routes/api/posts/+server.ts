//? Should this be here or in the +page.server
import { json } from '@sveltejs/kit';
import { getPostsByTag, getPosts } from '$scripts/GetContent';
import type { Post } from '$utils/types';
import type { RequestHandler } from './$types';
import { isTags } from '$utils/types';
import type { TagsType } from '$utils/types';

export const GET = (async ({ request }) => {
  let posts: Post[] = await getPosts();
  // post-tags header should be a comma separated list or single value (or null)
  let tags: TagsType[];
  const headerTagsRaw = request.headers.get('post-tags');
  let headerTags: string[] = [];
  // TODO could clean up this logic
  if (headerTagsRaw) {
    if (headerTagsRaw && headerTagsRaw.includes(',')) {
      headerTags = headerTagsRaw?.split(',');
    } else if (headerTagsRaw) {
      headerTags = [headerTagsRaw];
    }
    if (isTags(headerTags)) {
      tags = headerTags;
      posts = await getPostsByTag(tags);
    }
  }
  return json(posts);
}) satisfies RequestHandler;
