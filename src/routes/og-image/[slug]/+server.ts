// import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getOGImage } from '$lib/ogImages/generateOGImage.js';

export const GET = async ({ params }) => {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);
    const img = await getOGImage(post.metadata.title);
    return new Response(img, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename=${params.slug}.png`,
      },
    });
  } catch (e) {
    console.log(e);
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
};
