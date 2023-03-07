import type { PageLoad } from './$types';

export const load = (() => {
  return {
    title: 'Blog',
  };
}) satisfies PageLoad;
