import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';
import { FontaineTransform } from 'fontaine';

const fontaineOptions = {
  fallbacks: [
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'Impact',
  ],
  // You may need to resolve assets like `/fonts/Roboto.woff2` to a particular directory
  //resolvePath: (id) => 'file:///path/to/public/dir' + id,
  // overrideName: (originalName) => `${name} override`
  // sourcemap: false
};

export default defineConfig({
  plugins: [sveltekit(), stylelint(), FontaineTransform.vite(fontaineOptions)],
});
