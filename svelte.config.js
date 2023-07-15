import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import path from 'path';

/**  @type {import('mdsvex').MdsvexOptions  } */
const mdsvexOptions = {
  extension: ['.md'],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $components: path.resolve('src/lib/components'),
      $styles: path.resolve('src/lib/styles'),
      $scripts: path.resolve('src/lib/scripts'),
      $utils: path.resolve('src/lib/utils'),
    },
  },
};

export default config;
