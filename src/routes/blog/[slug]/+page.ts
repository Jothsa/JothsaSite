import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata,
      title: post.title,
    };
  } catch (e) {
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
}
