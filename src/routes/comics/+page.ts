import type { PageLoad } from './$types';

export const load = (() => {
  return {
    title: 'Comics',
  };
}) satisfies PageLoad;
