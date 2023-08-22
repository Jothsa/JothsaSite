import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = async function load({ params, fetch }) {
  let reactions;
  try {
    const post = await import(`../../../posts/${params.slug}.md`);
    try {
      const reactionHeaders = { slug: params.slug, action: 'fetch' };
      const reactionResponse = await fetch('/api/react', {
        headers: reactionHeaders,
      });
      reactions = await reactionResponse.json();
    } catch (e) {
      reactions = undefined;
    }
    return {
      content: post.default,
      meta: post.metadata,
      description: post.metadata.description,
      title: post.metadata.title,
      slug: params.slug,
      reactions: reactions.reactions,
    };
  } catch (e) {
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
} satisfies PageLoad;
