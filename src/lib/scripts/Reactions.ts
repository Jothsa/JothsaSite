// 😍😁😂🤯🥳🤨🙁😠

export type ReactionEmoji =
  | '😍'
  | '😁'
  | '😂'
  | '🤯'
  | '🥳'
  | '🤨'
  | '🙁'
  | '😠';

export const ReactionsList: { emoji: ReactionEmoji; description: string }[] = [
  { emoji: '😍', description: 'love' },
  { emoji: '😁', description: 'like' },
  { emoji: '😂', description: 'laugh' },
  { emoji: '🤯', description: 'mindblown' },
  { emoji: '🥳', description: 'celebrate' },
  { emoji: '🤨', description: 'skeptical' },
  { emoji: '🙁', description: 'disappointed' },
  { emoji: '😠', description: 'upset' },
];

export function handleReaction() {}
