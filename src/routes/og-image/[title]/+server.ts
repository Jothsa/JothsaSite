// import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getOGImage } from '$lib/ogImages/generateOGImage.js';
import type { EntryGenerator } from './$types.js';

export const prerender = true;

// * make sure title is capitalized correctly!

export const GET = async ({ params }) => {
  try {
    // console.log(...post.metadata.featuredImage);
    // const fI = await readFile(post.metadata.ogImage, 'utf8');
    // console.log('fI:', post.metadata.ogImage.slice(0, 10));
    const imgRes = await getOGImage(params.title, null);
    const { img, svg } = imgRes;

    const b = await img.toBuffer();

    return new Response(b, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        // 'Content-Disposition': `attachment; filename=${params.slug}-pls-work-01.png`,
      },
    });
  } catch (e) {
    console.log(e);
    throw error(404, `Uh oh! Could not find ${params.title}`);
  }
};

// * make sure title is capitalized correctly!

export const entries: EntryGenerator = () => {
  return [{ title: 'Home' }, { title: 'Blog' }, { title: 'About' }];
};
