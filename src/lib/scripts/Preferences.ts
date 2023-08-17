import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type Themes = (typeof themes)[number];
// type FunLevel = 1 | 2 | 3;
export const themes = ['normal'] as const;

export const theme: Writable<Themes> = writable('normal');
export const themeMode: Writable<ThemeMode> = writable('auto');
export const imageBlurEffect = writable(true);
// export const isReducedMotion: Writable<boolean> = writable(false);
// export const funLevel: Writable<FunLevel> = writable(3);

export function isThemeMode(t: string | null | undefined): t is ThemeMode {
  if (t === 'light' || t === 'dark' || t === 'auto') {
    return true;
  } else return false;
}
