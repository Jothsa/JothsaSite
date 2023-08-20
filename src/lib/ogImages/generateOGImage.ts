import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import type { Post } from '../utils/types';
import baseTemplate from './OG.svg?raw';

export async function getOGImage(
  title: string,
  featuredImage: string | undefined,
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
  featuredImage: string | undefined,
  template: string,
) {
  // const title = {
  //   type: 'h1',
  //   props: {
  //     children: post.title,
  //     style: { color: 'black' },
  //   },
  // };
  // const postDescription = {
  //   type: 'p',
  //   props: {
  //     children: post.description,
  //     style: { color: 'black' },
  //   },
  // };
  // const siteLogo = {
  //   type: 'img',
  //   props: {
  //     src: 'TODO',
  //     style: { width: '300px', height: '300px' },
  //   },
  // };
  // const template = {
  //   type: 'div',
  //   props: {
  //     children: {
  //       type: 'div',
  //       props: {
  //         children: 'hello, world',
  //         style: { color: 'black' },
  //       },
  //     },
  //     style: { color: 'black' },
  //   },
  // };

  let customizedTemplate = template;

  customizedTemplate = customizedTemplate.replace('${post-title}', title);
  console.log('template: ', customizedTemplate);
  let imgBase64: string = '';
  if (featuredImage) {
    const img = await import(featuredImage);
    imgBase64 = btoa(img);
  }

  // console.log(customizeTemplate);
  customizedTemplate = customizedTemplate.replace('${featured-img}', imgBase64);
  return customizedTemplate;
}

export async function getTemplateScreenshot(
  template: string,
  width = 1200,
  height = 632,
) {
  // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
  // encoding is null so buffer will be returned
  // must be in ttf format

  // const carterOne = readFileSync('/static/fonts/CarterOne.ttf', null);
  // const noto = readFileSync(
  //   '/static/fonts/NotoSansDisplay_Condensed-Regular.ttf',
  //   null,
  // );

  // const svg = await satori(template, {
  //   width: width,
  //   height: height,
  //   fonts: [
  //     { name: 'Carter One', data: carterOne },
  //     { name: 'Noto', data: noto },
  //   ],
  // });
  const opts = {
    background: 'rgba(238, 235, 230, .9)',
    fitTo: {
      mode: 'width',
      value: width,
    },
    font: {
      fontFiles: ['./CarterOne.ttf', './NotoSansDisplay_Condensed-Regular.ttf'], // Load custom fonts.
      loadSystemFonts: false, // It will be faster to disable loading system fonts.
      defaultFontFamily: 'Noto Sans Display',
    },
  };

  const resvg = new Resvg(template, opts);

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  return pngBuffer;
}
