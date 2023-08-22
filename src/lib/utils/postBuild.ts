import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { getPosts } from '../scripts/GetContent';
import { generateOGImages } from '../ogImages/generate-og-images';
import ogTemplate from '../ogImages/ogTemplate.txt?raw';
import path from 'path';

const saveDir = path.resolve('/static/ogImages');
// URL to chrome tar file
const chromeURL = '/chromium ';

// don't need webGL
chromium.setGraphicsMode = false;

// load fonts
await chromium.font(
  'https://raw.githack.com/googlei18n/noto-emoji/master/fonts/NotoColorEmoji.ttf',
);
await chromium.font(
  'https://fonts.gstatic.com/s/carterone/v17/q5uCsoe5IOB2-pXv9UcNExN8hK5SAMo.woff2',
);

const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(chromeURL),
  headless: chromium.headless,
});

const posts = await getPosts();

export async function postBuildCommands() {
  await generateOGImages(browser, posts, ogTemplate, saveDir);
}
