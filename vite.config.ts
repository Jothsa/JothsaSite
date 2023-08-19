import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
// import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [, sveltekit(), imagetools()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  build: {
    target: 'esNext',
  },
});
