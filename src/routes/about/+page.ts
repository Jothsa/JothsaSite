import type { PageLoad } from './$types';

export const load = (() => {
  return {
    title: `About`,
  };
}) satisfies PageLoad;
