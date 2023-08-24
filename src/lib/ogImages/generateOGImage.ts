import baseTemplate from './OGSharp.svg?raw';
import ogFallbackBG from './OGFallbackBG.svg?raw';
// import type { Picture } from 'vite-imagetools';
import sharp, { type Sharp } from 'sharp';
export async function getOGImage(
  title: string,
  featuredImage: string | null | undefined,
  width = 1200,
  height = 632,
) {
  const ogTemplate = await customizeTemplate(title, baseTemplate);
  return {
    img: await getTemplateScreenshot(ogTemplate, featuredImage, width, height),
    svg: ogTemplate,
  };
}

async function customizeTemplate(
  title: string,
  // featuredImage: string | undefined,
  template: string,
) {
  let customizedTemplate = template.toString();

  customizedTemplate = customizedTemplate.replace('${post-title}', title);
  // console.log('template: ', customizedTemplate);
  // let imgBase64: string = '';
  // if (featuredImage) {
  // customizedTemplate = customizedTemplate.replace('${og-image}', featuredImage);
  // }

  // console.log(customizeTemplate);
  return customizedTemplate;
}

export async function getTemplateScreenshot(
  template: string,
  ogImage: string | undefined | null,
  width = 1200,
  height = 632,
  fallbackBG = ogFallbackBG,
) {
  const bg = 'white';

  const templateBuffer = Buffer.from(template);
  const templateImg = sharp(templateBuffer).resize(width, height);
  let ogBG: Sharp;
  if (ogImage) {
    const ogFeaturedImageBuffer = Buffer.from(ogImage, 'base64');
    ogBG = sharp(ogFeaturedImageBuffer);
  } else {
    ogBG = sharp(Buffer.from(fallbackBG));
  }
  ogBG
    .resize(
      width,
      height /* {fit: 'inside', position: 'centre', background: bg}*/,
    )
    .composite([
      {
        input: await templateImg.toBuffer(),
        gravity: 'south',
        blend: 'atop',
      },
    ])
    .flatten({ background: bg });
  return ogBG.png();
}
