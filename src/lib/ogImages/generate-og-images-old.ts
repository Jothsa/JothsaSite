import type { Post } from '../utils/types';
import type { Browser, Page } from 'puppeteer-core';


export async function generateOGImages(
  browser: Browser,
  posts: Post[],
  template: string,
  saveDir: string,
  width = 1200,
  height = 632,
) {
  const page = await browser.newPage();
  await page.setContent(template, {
    waitUntil: ['domcontentloaded'],
  });
  await page.evaluateHandle('document.fonts.ready');
  // Set the viewport to your preferred og:image size
  await page.setViewport({
    width: width,
    height: height,
    // My mac book is retina, so this should be 2 while testing locally
    deviceScaleFactor: process.env.NETLIFY === 'true' ? 1 : 2,
  });

  posts.forEach(async (post) => {
    await generateOGImage(post, page, saveDir, width, height)
  })
}

export async function generateOGImage(
  post: Post,
  page: Page,
  saveDir: string,
  width = 1200,
  height = 632,
) {
  await customizeTemplate(page, post);
  await saveTemplateScreenshot(page, post.slug, saveDir, width, height);
}
/**
 * @param page - should already be the template
 */
async function customizeTemplate(page: Page, post: Post) {
  await page.evaluate(($post) => {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    if (title !== null && description !== null) {
      title.innerHTML = $post.title;
      description.innerHTML = $post.description;
    }
  }, post);
}

async function saveTemplateScreenshot(
  page: Page,
  slug: string,
  saveDir: string,
  width = 1200,
  height = 632,
) {
  // Save a screenshot to public/og-images/slug-of-post.jpeg
  await page.screenshot({
    path: `${saveDir}${slug}.jpeg`,
    type: 'jpeg',
    quality: 100,
    clip: { x: 0, y: 0, width: width, height: height },
  });
}
