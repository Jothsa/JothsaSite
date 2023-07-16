//? Should this be here or in the +page.server
import { json } from '@sveltejs/kit';
import { getPostsByCategory, getPosts } from '$scripts/GetContent';
import type { Post } from '$utils/types';
import type { RequestHandler } from './$types';
import { isCategories } from '$utils/types';
import type { Categories } from '$utils/types';

export const GET = (async ({ request }) => {
  let posts: Post[] = await getPosts();
  // post-categories header should be a comma separated list or single value (or null)
  let categories: Categories[];
  const headerCatsRaw = request.headers.get('post-categories');
  let headerCats: string[] = [];
  if (headerCatsRaw) {
    if (headerCatsRaw && headerCatsRaw.includes(',')) {
      headerCats = headerCatsRaw?.split(',');
    } else if (headerCatsRaw) {
      headerCats = [headerCatsRaw];
    }
    if (isCategories(headerCats)) {
      categories = headerCats;
      posts = await getPostsByCategory(categories);
    }
  }
  return json(posts);
}) satisfies RequestHandler;
