//? Should this be here or in the +page.server
// TODO Make sure 0 is falsy
import { json } from '@sveltejs/kit';
import { isPostSlug } from '$scripts/GetContent';
import type { RequestHandler } from './$types';
import type { ReactionDescription, ReactionEmoji } from '$scripts/Reactions';
import { isReactionDescription, isReactionEmoji } from '$scripts/Reactions';
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
  const headerActionRaw = request.headers.get('action');

  let reaction: ReactionDescription | undefined = undefined;
  let postSlug: string | undefined = undefined;
  let action: 'increment' | 'decrement' | 'fetch' | undefined = undefined;
  let success = false;

  if (
    headerActionRaw &&
    (headerActionRaw === 'increment' ||
      headerActionRaw === 'decrement' ||
      headerActionRaw === 'fetch')
  ) {
    action = headerActionRaw;
  }

  if (headerReactionRaw) {
    if (isReactionDescription(headerReactionRaw)) {
      reaction = headerReactionRaw;
    }
  }
  if (headerPostSlugRaw) {
    if (isPostSlug(headerPostSlugRaw)) {
      postSlug = headerPostSlugRaw;
    }
  }

  // maybe add rate limiting or something idk
  if (action === 'increment' || action === 'decrement') {
    if (reaction && postSlug) {
      const conn = connect(planetScaleConfig);
      if (action === 'increment') {
        const result = await conn.execute(
          `update \`post-reactions\` set ${reaction} = ${reaction} + '1' where slug=${postSlug}`,
        );
      } else {
        const result = await conn.execute(
          `update \`post-reactions\` set ${reaction} = ${reaction} - 1 where slug=${postSlug}`,
        );
      }
    } else {
      success = false;
    }
  } else if (action === 'fetch') {
    const conn = connect(planetScaleConfig);
    const result = await conn.execute(
      `select 'love', 'laugh', 'mindblown', 'celebrate', 'skeptical', 'disappointed', 'upset'  from \`post-reactions\` where slug = ${postSlug}`,
    );
  } else {
    success = false;
  }

  type ReactionRequestResponse = {
    success: boolean;
  };

  const response: ReactionRequestResponse = { success: success };

  return json(response);
}) satisfies RequestHandler;















