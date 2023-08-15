import { description, url, siteTitle } from '$utils/config';
import type { Post } from '$utils/types';

export async function GET({ fetch }) {
  const response = await fetch('api/posts');
  const res = await response.json();
  const posts: Post[] = res.posts;

  const headers = {
    'Content-Type': 'application/xml',
    'x-content-type-options': 'nosniff',
    'Cache-Control': `max-age=0, s-max-age=${600}`,
  };

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <?xml-stylesheet href="/pretty-feed-v3.xsl" type="text/xsl"?>
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
			<channel>
				<title>${siteTitle}</title>
				<description>${description}</description>
				<link>${url}</link>
				<atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
          .map(
            (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${url}blog/${post.slug}</link>
							<guid isPermaLink="true">${url}/${post.slug}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`,
          )
          .join('')}
			</channel>
		</rss>
	`.trim();

  return new Response(xml, { headers });
}
