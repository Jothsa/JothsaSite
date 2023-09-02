import type { PageServerLoad } from './$types';

export const load = (() => {
  return {
    title: `Search`,
  };
}) satisfies PageServerLoad;
