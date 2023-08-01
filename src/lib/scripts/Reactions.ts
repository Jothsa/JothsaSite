// 😍😁😂🤯🥳🤨🙁😠

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

export function handleReaction() {}
