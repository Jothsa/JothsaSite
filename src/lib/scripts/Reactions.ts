// 😍😁😂🤯🥳🤨🙁😠

export const ReactionsList = [
  { emoji: '😍', description: 'love' },
  { emoji: '😁', description: 'like' },
  { emoji: '😂', description: 'laugh' },
  { emoji: '🤯', description: 'mindblown' },
  { emoji: '🥳', description: 'celebrate' },
  { emoji: '🤨', description: 'u' },
  { emoji: '🙁', description: 'disappointed' },
  { emoji: '😠', description: 'upset' },
] as const;

export type ReactionEmoji = (typeof ReactionsList)[number]['emoji'];

export function handleReaction() {}

export function isReactionEmoji(r: string | undefined | null): r is ReactionEmoji {
  ReactionsList.forEach((reaction) => {
    if (reaction.emoji === r) {
      return true;
    }
  });
  return false;
}
