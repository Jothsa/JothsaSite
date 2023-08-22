// import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getOGImage } from '$lib/ogImages/generateOGImage.js';
import { getPostsSlugs } from '$scripts/GetContent';
import type { EntryGenerator } from './$types';
import type { Post } from '$utils/types';

export const prerender = true;

export const GET = async ({ params }) => {
  try {
    const post = await import(`../../../posts/${params.slug}.md`);
    // console.log(...post.metadata.featuredImage);
    // const fI = await readFile(post.metadata.ogImage, 'utf8');
    // console.log('fI:', post.metadata.ogImage.slice(0, 10));
    const imgRes = await getOGImage(
      post.metadata.title,
      post.metadata?.ogImage,
    );
    const { img, svg } = imgRes;

    // const binaryString = atob(img.toString().split(',')[1]); // Binary data string
    // const blob = new Blob([binaryString], { type: 'image/png' }); // Create a BLOB object
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
    throw error(404, `Uh oh! Could not find ${params.slug}`);
  }
};

export const entries: EntryGenerator = async () => {
  const entries: {slug: string}[] = [];
  (await getPostsSlugs()).forEach((slug) => {
    entries.push({ slug: slug });
  });
  return entries;
};
