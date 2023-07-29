import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata,
      title: post.metadata.title,
    };
  } catch (e) {
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
} satisfies PageLoad;
