import { readable } from 'svelte/store';
import { onMount } from 'svelte';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

// ? not sure about type of set
export const reducedMotion = readable((set: (arg0: boolean) => void) => {
  onMount(() => {
    // ? not sure about event type
    const updateMotionPreference = (event: { matches: boolean }) => {
      set(event.matches);
    };

    const mediaQueryList = window.matchMedia(reducedMotionQuery);
    mediaQueryList.addEventListener('change', updateMotionPreference);
    return () => {
      mediaQueryList.removeEventListener('change', updateMotionPreference);
    };
  });
});
