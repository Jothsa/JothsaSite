import type { PageLoad } from './$types';
export const prerender = true;


export const load = (() => {
  return {
    title: `About`,

  };
}) satisfies PageLoad;
