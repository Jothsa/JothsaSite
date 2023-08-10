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
  let result = false;

  ReactionsList.forEach((reaction) => {
    if (reaction.emoji === r) {
      result = true;
    }
  });
  return result;
}

export function isReactionDescription(
  r: string | undefined | null,
): r is ReactionDescription {
  let result = false;
  ReactionsList.forEach((reaction) => {
    if (reaction.description === r) {
      result = true;
    }
  });
  return result;
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
  increment(r: ReactionDescription) {
    this[r] = this[r]++;
  }
  decrement(r: ReactionDescription) {
    this[r] = this[r]--;
  }
  swap(from: ReactionDescription, to: ReactionDescription) {
    this[from] = this[from]--;
    this[to] = this[to]++;
  }
}
