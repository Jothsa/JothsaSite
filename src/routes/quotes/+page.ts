import type { PageLoad } from './$types';

export const load = (() => {
  return {
    title: 'Quotes',
  };
}) satisfies PageLoad;
