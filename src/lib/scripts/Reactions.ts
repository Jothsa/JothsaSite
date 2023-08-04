// 😍😁😂🤯🥳🤨🙁😠
// love, like, laugh, mindblown, celebrate, skeptical, disappointed, upset

// import type { PostSlug } from './GetContent';

export const ReactionsList = [
  { emoji: '😍', description: 'love' },
  { emoji: '😁', description: 'like' },
  { emoji: '😂', description: 'laugh' },
  { emoji: '🤯', description: 'mindblown' },
  { emoji: '🥳', description: 'celebrate' },
  { emoji: '🤨', description: 'skeptical' },
  { emoji: '🙁', description: 'disappointed' },
  { emoji: '😠', description: 'upset' },
] as const;

export type ReactionEmoji = (typeof ReactionsList)[number]['emoji'];
export type ReactionDescription = (typeof ReactionsList)[number]['description'];
export type ReactionRecord = {
  emoji: ReactionEmoji;
  count: number;
};
export function handleReaction() {}

// export function getReactions(slug: PostSlug): Reactions {
//   const headers = { slug: slug };
// }

export function isReactionEmoji(
  r: string | undefined | null,
): r is ReactionEmoji {
  ReactionsList.forEach((reaction) => {
    if (reaction.emoji === r) {
      return true;
    }
  });
  return false;
}

export function isReactionDescription(
  r: string | undefined | null,
): r is ReactionDescription {
  ReactionsList.forEach((reaction) => {
    if (reaction.description === r) {
      return true;
    }
  });
  return false;
}

export type ReactionCounts = Record<ReactionDescription, number>;
export type ReactionsRecord = Record<ReactionDescription, ReactionRecord>;

// love, like, laugh, mindblown, celebrate, skeptical, disappointed, upset

export class RCRec {
  love: number;
  like: number;
  laugh: number;
  mindblown: number;
  celebrate: number;
  skeptical: number;
  disappointed: number;
  upset: number;

  constructor(reactions: ReactionCounts) {
    this.love = reactions.love;
    this.like = reactions.like;
    this.laugh = reactions.laugh;
    this.mindblown = reactions.mindblown;
    this.celebrate = reactions.celebrate;
    this.skeptical = reactions.skeptical;
    this.disappointed = reactions.disappointed;
    this.upset = reactions.upset;
  }
}
