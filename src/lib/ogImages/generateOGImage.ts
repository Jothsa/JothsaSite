import { Resvg, type ResvgRenderOptions } from '@resvg/resvg-js';

import baseTemplate from './OG.svg?raw';
import { resolve } from 'path';
import type { Picture } from 'vite-imagetools';


export async function getOGImage(
  title: string,
  featuredImage: Picture | undefined,
  width = 1200,
  height = 632,
) {
  const ogTemplate = await customizeTemplate(
    title,
    featuredImage,
    baseTemplate,
  );
  return await getTemplateScreenshot(ogTemplate, width, height);
}

async function customizeTemplate(
  title: string,
  featuredImage: Picture | undefined,
  template: string,
) {
  let customizedTemplate = template.toString();

  customizedTemplate = customizedTemplate.replace('${post-title}', title);
  console.log('template: ', customizedTemplate);
  // let imgBase64: string = '';
  if (featuredImage) {
    console.log('fi', featuredImage);
    // const img = await import(featuredImage.img.src);
    // imgBase64 = btoa(featuredImage.sources['avif']);
    // customizedTemplate = customizedTemplate.replace('${featured-img}', imgBase64);
  }

  // console.log(customizeTemplate);
  return customizedTemplate;
}

export async function getTemplateScreenshot(
  template: string,
  width = 1200,
  height = 632,
) {

  const opts: ResvgRenderOptions = {
    background: 'rgba(238, 235, 230, .9)',
    fitTo: {
      mode: 'width',
      value: width,
    },
    font: {
      fontFiles: ['/fonts/CarterOne.ttf', `${resolve('.')}NotoSansDisplay_Condensed-Regular.ttf`], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts. It shouldn't matter since I'm prerendering and can't get the path to work
      defaultFontFamily: 'Noto Sans Display',
    },
    'logLevel': 'debug'
  };

  const resvg = new Resvg(template, opts);

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
}
