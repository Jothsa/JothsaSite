import type { Post, Categories } from '$utils/types';
import { isCategory } from '$utils/types';

import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const catParam = params.category;
  let category: Categories;
  console.log(`cat -${catParam}-`);

  if (isCategory(catParam)) {
    category = catParam;
    console.log('cat: ', category);
    const headers = { 'post-categories': category };
    const response = await fetch('/api/posts', { headers: headers });
    const posts: Post[] = await response.json();
    // setHeaders(headers);
    console.log(posts);

    return {
      posts,
      title: category,
    };
  } else {
    throw error(404, `Uh oh! Could not find category ${params.category}`);
  }
}
