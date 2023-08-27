import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export type ThemeMode = 'light' | 'dark' | 'auto';
export type Themes = (typeof themes)[number];
// type FunLevel = 1 | 2 | 3;
export const themes = ['normal', 'forest'] as const;

export const theme: Writable<Themes> = writable('normal');
export const themeMode: Writable<ThemeMode> = writable('auto');
export const blur = writable(true);

// the logic for setting this is in the prefs component because it needs the window object
export const isForcedReducedMotion: Writable<boolean> = writable(false);
// export const funLevel: Writable<FunLevel> = writable(3);

export function isThemeMode(t: string | null | undefined): t is ThemeMode {
  if (t === 'light' || t === 'dark' || t === 'auto') {
    return true;
  } else return false;
}
export function isTheme(t: string | null | undefined): t is Themes {
  if (t && themes.includes(t as Themes)) {
    return true;
  } else return false;
}

// @link https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/
export function isDeviceReducedMotion(): boolean {
  const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQueryList.matches;
}
