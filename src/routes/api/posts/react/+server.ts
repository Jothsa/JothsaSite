//? Should this be here or in the +page.server
// TODO Make sure 0 is falsy
import { json } from '@sveltejs/kit';
import { isPostSlug } from '$scripts/GetContent';
import type { RequestHandler } from './$types';
import { RCRec, isReactionDescription } from '$scripts/Reactions';
import type { ReactionDescription, ReactionCounts } from '$scripts/Reactions';
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

type ReactionRequestResponse = {
  reactions?: ReactionCounts;
  success: boolean;
};

export const GET = (async ({ request }) => {
  const headerReactionRaw = request.headers.get('reaction');
  const headerReactionFromRaw = request.headers.get('from');
  const headerPostSlugRaw = request.headers.get('slug');
  const headerActionRaw = request.headers.get('action');
  let reactions: ReactionCounts;
  let reaction: ReactionDescription | undefined = undefined;
  // ? null or und?
  let reactionSwapFrom: ReactionDescription | null = null;
  let postSlug: string | undefined = undefined;
  let action: 'increment' | 'decrement' | 'fetch' | 'swap' | undefined =
    undefined;
  let success = false;
  let response: ReactionRequestResponse = { success: success };

  if (
    headerActionRaw &&
    (headerActionRaw === 'increment' ||
      headerActionRaw === 'decrement' ||
      headerActionRaw === 'fetch')
  ) {
    action = headerActionRaw;
  }

  // Todo cleanup logic
  if (headerReactionRaw) {
    if (isReactionDescription(headerReactionRaw)) {
      reaction = headerReactionRaw;
    }
  }
  if (headerReactionFromRaw) {
    if (isReactionDescription(headerReactionFromRaw)) {
      reactionSwaoFrom = headerReactionFromRaw;
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
          `update \`post-reactions\` set ${reaction} = '${reaction}' + '1' where slug = '${postSlug}'`,
        );
      } else {
        const result = await conn.execute(
          `update \`post-reactions\` set ${reaction} = '${reaction}' - 1 where slug = '${postSlug}'`,
        );
      }
    } else {
      success = false;
    }
  } else if (action === 'swap' && reactionSwapFrom && reaction && postSlug) {
    const conn = connect(planetScaleConfig);
    const incResult = await conn.execute(
      `update \`post-reactions\` set ${reaction} = '${reaction}' + '1' where slug = '${postSlug}'`,
    );
    const decResult = await conn.execute(
      `update \`post-reactions\` set ${reactionSwapFrom} = '${reactionSwapFrom}' - '1' where slug = '${postSlug}'`,
    );
  } else if (action === 'fetch') {
    const conn = connect(planetScaleConfig);
    const result = await conn.execute(
      `select \`love\`, \`like\`, \`laugh\`, \`mindblown\`, \`celebrate\`, \`skeptical\`, \`disappointed\`, \`upset\` from \`post-reactions\` where slug = '${postSlug}'`,
      [],
      { as: 'array' },
    );
    const reactionsRow = result.rows[0];
    const love = reactionsRow.at(0) as number;
    const like = reactionsRow.at(1) as number;
    const laugh = reactionsRow.at(2) as number;
    const mindblown = reactionsRow.at(3) as number;
    const celebrate = reactionsRow.at(4) as number;
    const skeptical = reactionsRow.at(5) as number;
    const disappointed = reactionsRow.at(6) as number;
    const upset = reactionsRow.at(7) as number;
    reactions = new RCRec({
      love: love,
      like: like,
      laugh: laugh,
      mindblown: mindblown,
      celebrate: celebrate,
      skeptical: skeptical,
      disappointed: disappointed,
      upset: upset,
    });
    response = { reactions: reactions, success: success };
  } else {
    success = false;
  }

  return json(response);
}) satisfies RequestHandler;
