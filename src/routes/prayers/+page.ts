import type { PageLoad } from './$types';

export const load = (() => {
  return {
    title: 'Prayers',
  };
}) satisfies PageLoad;
