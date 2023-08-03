// 😍😁😂🤯🥳🤨🙁😠

import type { PostSlug } from "./GetContent";

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
  description: ReactionDescription;
  count: number;
};
export function handleReaction() { }

export function getReactions(slug: PostSlug): Reactions {
  const headers = {'slug': slug, }
}

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

export type Reactions = Record<ReactionDescription, ReactionRecord>;
