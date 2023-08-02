//? Should this be here or in the +page.server
// TODO Make sure 0 is falsy
import { json } from '@sveltejs/kit';
import { isPostSlug } from '$scripts/GetContent';
import type { RequestHandler } from './$types';
import type { ReactionEmoji } from '$scripts/Reactions';
import { isReactionEmoji } from '$scripts/Reactions';
import { connect } from '@planetscale/database';
import {
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} from '$env/static/private';

const planetScaleConfig = {
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
};

export const GET = (async ({ request }) => {
  const headerReactionRaw = request.headers.get('reaction');
  const headerPostSlugRaw = request.headers.get('post-slug');
  let reaction: ReactionEmoji; // need to switch to description
  let postSlug: string;
  const success = false;

  if (headerReactionRaw) {
    if (isReactionEmoji(headerReactionRaw)) {
      reaction = headerReactionRaw;
    }
  }
  if (headerPostSlugRaw) {
    if (isPostSlug(headerPostSlugRaw)) {
      postSlug = headerPostSlugRaw;
    }
  }

  // maybe add rate limiting or something idk
  if (reaction && postSlug) {
    const conn = connect(config);
    const result = await conn.execute(
      `update reactions set ${reaction} = ${reaction} + 1 where slug=${postSlug}`,
    );
  }

  type ReactionRequestResponse = {
    success: boolean;
  };

  const response: ReactionRequestResponse = { success: success };

  return json(response);
}) satisfies RequestHandler;
