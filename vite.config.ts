import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import type { Plugin } from 'vite';
// import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';
// import { postBuildCommands } from './src/lib/utils/postBuild';
import { readFileSync } from 'fs';

const hexLoader: Plugin = {
  name: 'b64-loader',
  transform(code, id) {
    const [path, query] = id.split('?');
    if (query != 'b64') return null;

    const data = readFileSync(path);
    const hex = data.toString('base64url');

    return `export default '${hex}';`;
  },
};

export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools(),
    hexLoader,
    // {
    //   name: 'postbuild-commands', // the name of your custom plugin. Could be anything.
    //   closeBundle: async () => {
    //     await postBuildCommands(); // run during closeBundle hook. https://rollupjs.org/guide/en/#closebundle
    //   },
    // },
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  build: {
    target: 'esNext',
  },
});
