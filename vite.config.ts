import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';
import { FontaineTransform } from 'fontaine';

export default defineConfig({
  plugins: [
    sveltekit(),
    stylelint(),
    FontaineTransform.vite({
      fallbacks: ['Impact'],
      // resolve absolute URL -> file
      // resolvePath: (id) => new URL('.' + id, import.meta.url),
    }),
  ],
});
