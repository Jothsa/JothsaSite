import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

// function createAnimStore() {
//   const { subscribe, set, update } = <Writable<'true' | 'false' | 'reduced'>>(
//     writable('false')
//   );
//   return {
//     subscribe,
//       setFromLocalStorage: () => {
//           if (browser && localStorage.getItem('anim')) {
            
//         }
//     },
//       saveToLocalStorage: () => {
          
//       },
//   };
// }

export const anim = <Writable<'true' | 'false' | 'reduced'>>writable('true');
