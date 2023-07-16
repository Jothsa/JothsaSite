//? Should this be here or in the +page.server
import { json } from '@sveltejs/kit';
import { getPostsByCategory, getPosts } from '$scripts/GetContent';
import type { Post } from '$utils/types';
import type { RequestHandler } from './$types';
import { isCategories } from '$utils/types';
import type { Categories } from '$utils/types';

export const GET = (async ({ request }) => {
  let posts: Post[] = await getPosts();
  // return json(posts);
  // log all headers
  console.log(`headers: `, ...request.headers);
  // should be a comma separated list or single value
  let categories: Categories[];
  const headerCatsRaw = request.headers.get('post-categories');
  let headerCats: string[] = [];
  console.log(`headerCatsRaw: ${headerCatsRaw}`);
  if (headerCatsRaw) {
    if (headerCatsRaw && headerCatsRaw.includes(',')) {
      headerCats = headerCatsRaw?.split(',');
      console.log(headerCats);
    } else if (headerCatsRaw) {
      headerCats = [headerCatsRaw];
      console.log(headerCats);
    }
    if (isCategories(headerCats)) {
      categories = headerCats;
      posts = await getPostsByCategory(categories);
    }
  }
  // else {
  //   posts = await getPosts();
  // }

  // create a JSON Response using a header we received
  return json(posts);
}) satisfies RequestHandler;
