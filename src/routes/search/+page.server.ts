import { searchPosts } from '$scripts/Search';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ url, fetch }) => {
  const searchUrl = '/api/search';

  const searchQuery = url.searchParams.get('q');
  if (!searchQuery) return;
  const searchHeaders = { query: searchQuery };
  const searchResult = await (
    await fetch(`${searchUrl}`, { headers: searchHeaders })
  ).json();

  return {
    status: 200,
    props: {
      searchQuery: searchQuery,
      searchResult: searchResult.results,
    },
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
