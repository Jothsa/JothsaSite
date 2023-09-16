import type { ZonedDateTimeISO } from "@js-temporal/polyfill";

import { getPosts } from '$scripts/GetContent';
import { url as siteBaseURL, timeZone } from '$utils/config';

export const prerender = true;
type SitemapURL = { url: URL; lastMod: ZonedDateTimeISO };

const urls: SitemapURL[] = [];

const staticURLS = ['/about', '/contact', '/events'];

urls.push(...(await generatePostURLS()));

export const GET = async () => {
  return new Response(
    `
        <?xml version="1.0" encoding="UTF-8" ?>
        <urlset
            xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="https://www.w3.org/1999/xhtml"
            xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
            xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
            xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
        >
            ${generateXMLURLS(urls)}
        </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  );
};

function generateXMLURLS(urls: SitemapURL[]): string {
  let output = '';
  urls.forEach((url) => {
    output =
      output +
      generateXMLURL({ url: url.url, lastMod: url.lastMod });
  });
  return output;
}

function generateXMLURL(url: SitemapURL): string {
  return `
    <url>
      <loc>${url.url.toString()}</loc>
      <lastmod>${url.lastMod.toString()}</lastmod>
    </url>
  `;
}

// TODO allow posts to have last modified date in metadata
async function generatePostURLS(): Promise<SitemapURL[]> {
  const posts = await getPosts();
  const output: SitemapURL[] = [];
  posts.forEach((post) => {
    output.push({
      url: new URL(`blog/${post.slug}`, siteBaseURL),
      lastMod: post.date.toString(),
    });
  });
  return output;
}
