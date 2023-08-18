import { connect } from '@planetscale/database';
import {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} from '$env/static/private';
import type { Post } from '$utils/types';
import type { PostSlug } from './GetContent';
const planetScaleConfig = {
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
};

export async function generateMissingPostDBRecords(posts: Post[]) {
  const conn = await connect(planetScaleConfig);
  const existingSlugsRaw = await conn.execute(
    `Select \`post-slugs\` from \`post-reactions\``,
  );
  const existingSlugs: PostSlug[] = []; // TODO
  posts.forEach(async (post) => {
    if (!existingSlugs.includes(post.slug)) {
      // TODO make sure defaults set for reactions
      await conn.execute(
        `Insert into \`post-reactions\` (\`slug\`) VALUES (\`${post.slug}\`)`,
      );
    }
  });
}
