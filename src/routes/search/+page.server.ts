import { searchPosts } from '$scripts/Search';
import type { PageServerLoad, Actions } from './$types';

export const load = (() => {
  return {
    title: `Search`,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const query = data.get('query')?.toString() || null;
    const filtersRaw = data.getAll('filters') || null;
    // convert the formData filters to a string array
    // filters aren't quite right so holding off for now
    const filters = filtersRaw?.map((filter) => filter.toString()) || null;
    if (query) {
      // if (filters) {
      //   const results = await searchPosts({ query: query, filters: filters });
      // }
      const results = await searchPosts({ query: query });
      return { results: results?.items, totalPages: results?.totalPages };
    }
  },
} satisfies Actions;
