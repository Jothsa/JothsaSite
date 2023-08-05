import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = async function load({ params, fetch }) {
  let reactions;
  try {
    const post = await import(`../../../posts/${params.slug}.md`);
    try {
      const reactionHeaders = { slug: params.slug, action: 'fetch' };
      const reactionResponse = await fetch('/api/posts/react', {
        headers: reactionHeaders,
      });
      reactions = await reactionResponse.json();
    } catch (e) {
      reactions = undefined;
    }
    return {
      content: post.default,
      meta: post.metadata,
      title: post.metadata.title,
      slug: params.slug,
      reactions: reactions.reactions,
    };
  } catch (e) {
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
} satisfies PageLoad;
