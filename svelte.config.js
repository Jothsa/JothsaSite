// import adapter from '@sveltejs/adapter-auto';
import adapterNetlify from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex, escapeSvelte } from 'mdsvex';
import path from 'path';
import shiki from 'shiki';
// import { readFileSync } from 'fs';
import emoji from 'remark-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';
import remarkUnwrapImages from 'remark-unwrap-images';

// From https://github.com/microsoft/vscode/tree/501a0190687e5bd799ff6844d9563b45c0e3ed53/extensions/theme-defaults/themes
// const darkModernTheme = JSON.parse(readFileSync('./darkModernTheme.json'));

/**  @type {import('mdsvex').MdsvexOptions  } */
const mdsvexOptions = {
  layout: {
    _: '/src/mdsvexLayout.svelte',
  },
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await shiki.getHighlighter({ theme: 'dark-plus' });
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
      return `{@html \`${html}\` }`;
    },
    // highlight: {
    //   highlighter: async (code, lang, meta) => {
    //     const highlighter = await createShikiHighlighter({
    //       theme: palenightTheme,
    //     });

    //     let twoslashResults = null;
    //     if (meta && meta.includes('twoslash')) {
    //       twoslashResults = runTwoSlash(code, lang, {});
    //     }

    //     const html = renderCodeToHTML(
    //       code,
    //       lang,
    //       meta || [],
    //       {},
    //       highlighter,
    //       twoslashResults,
    //     );

    //     return `{@html \`${html}\` }`;
    //   },
  },
  remarkPlugins: [remarkUnwrapImages, [emoji, { accessible: true }], a11yEmoji],
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapterNetlify(),

    alias: {
      $components: path.resolve('src/lib/components'),
      $styles: path.resolve('src/lib/styles'),
      $scripts: path.resolve('src/lib/scripts'),
      $assets: path.resolve('src/lib/assets'),
      $ogImages: path.resolve('src/static/ogImages'),
      $images: path.resolve('src/lib/assets/images'),
      $videos: path.resolve('src/lib/assets/videos'),
      $utils: path.resolve('src/lib/utils'),
      $posts: path.resolve('src/posts'),
    },
  },
};

export default config;
