import type { Post, Categories } from '$utils/types';
import { isCategory } from '$utils/types';

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async function load({ params, fetch }) {
  const catParam = params.category;
  let category: Categories;

  if (isCategory(catParam)) {
    category = catParam;
    const headers = { 'post-categories': category };
    const response = await fetch('/api/posts', { headers: headers });
    const posts: Post[] = await response.json();

    return {
      posts,
      title: category,
      category: category,
    };
  } else {
    throw error(404, `Uh oh! Could not find category ${params.category}`);
  }
} satisfies PageLoad;
