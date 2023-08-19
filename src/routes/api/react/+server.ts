//? Should this be here or in the +page.server
// TODO Improve error handling, custom error codes? :eyes:
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
  const headerSwapFromRaw = request.headers.get('swap-from');
  const headerPostSlugRaw = request.headers.get('slug');
  const headerActionRaw = request.headers.get('action');
  let reactions: ReactionCounts;
  let reaction: ReactionDescription | null = null;
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
      headerActionRaw === 'swap' ||
      headerActionRaw === 'fetch')
  ) {
    action = headerActionRaw;
  }

  if (headerReactionRaw && isReactionDescription(headerReactionRaw)) {
    reaction = headerReactionRaw;
  }

  if (headerSwapFromRaw && isReactionDescription(headerSwapFromRaw)) {
    reactionSwapFrom = headerSwapFromRaw;
  }

  if (headerPostSlugRaw && isPostSlug(headerPostSlugRaw)) {
    postSlug = headerPostSlugRaw;
  }

  // maybe add rate limiting or something idk
  if (action === 'increment' || action === 'decrement' || action === 'swap') {
    if (reaction && postSlug) {
      const conn = connect(planetScaleConfig);
      if (action === 'increment') {
        console.log('i');
        const result = await conn.execute(
          `update \`post-reactions\` set \`${reaction}\` = \`${reaction}\` + '1' where \`slug\` = '${postSlug}'`,
        );
        success = true;
      } else if (action === 'decrement') {
        console.log('d');
        const result = await conn.execute(
          `update \`post-reactions\` set \`${reaction}\` = \`${reaction}\` - '1' where \`slug\` = '${postSlug}'`,
        );
        success = true;
      } else if (action === 'swap' && reactionSwapFrom) {
        console.log('s');
        const conn = connect(planetScaleConfig);
        const incResult = await conn.execute(
          `update \`post-reactions\` set \`${reaction}\` = \`${reaction}\` + '1' where \`slug\` = '${postSlug}'`,
        );
        const decResult = await conn.execute(
          `update \`post-reactions\` set \`${reactionSwapFrom}\` = \`${reactionSwapFrom}\` - '1' where \`slug\` = '${postSlug}'`,
        );
        success = true;
      }
    }
  } else if (action === 'fetch') {
    const conn = connect(planetScaleConfig);
    let result = await conn.execute(
      `select \`love\`, \`like\`, \`laugh\`, \`mindblown\`, \`celebrate\`, \`skeptical\`, \`disappointed\`, \`upset\` from \`post-reactions\` where slug = '${postSlug}'`,
      [],
      { as: 'array' },
    );
    // if the post isn't in the table, create it
    // if for some reason you needed to update the reactions before fetching their values, there would still be an error, but idk when that would be an issue
    // (I suppose to save a db call, I could just return 0 for the reactions values, but it's not a huge deal since it should be just one more query per post)
    if (result.rows.length === 0) {
      await conn.execute(
        `insert into \`post-reactions\`(slug) values ('${postSlug}')`,
      );
      result = await conn.execute(
        `select \`love\`, \`like\`, \`laugh\`, \`mindblown\`, \`celebrate\`, \`skeptical\`, \`disappointed\`, \`upset\` from \`post-reactions\` where slug = '${postSlug}'`,
        [],
        { as: 'array' },
      );
    }
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
    success = true;
  } else {
    success = false;
  }

  return json(response);
}) satisfies RequestHandler;
