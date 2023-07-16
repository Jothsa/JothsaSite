import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
type ThemeMode = 'light' | 'dark';
type Themes = (typeof themes)[number];
// type FunLevel = 1 | 2 | 3;
export const themes = ['normal'] as const;

export const theme: Writable<Themes> = writable('normal');
export const themeMode: Writable<ThemeMode> = writable('dark');
// export const isReducedMotion: Writable<boolean> = writable(false);
// export const funLevel: Writable<FunLevel> = writable(3);
