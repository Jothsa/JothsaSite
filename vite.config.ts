import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
// import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';
// import { postBuildCommands } from './src/lib/utils/postBuild';

export default defineConfig({
  plugins: [
    sveltekit(),
    imagetools(),
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
