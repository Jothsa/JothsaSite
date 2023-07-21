import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex, escapeSvelte } from 'mdsvex';
import path from 'path';
import shiki from 'shiki';
// import {
//   createShikiHighlighter,
//   runTwoSlash,
//   renderCodeToHTML,
// } from 'shiki-twoslash';
import { readFileSync } from 'fs';
import emoji from 'remark-emoji';
import a11yEmoji from '@fec/remark-a11y-emoji';

// From https://github.com/whizkydee/vscode-palenight-theme/blob/master/themes/palenight.json
const darkModernTheme = JSON.parse(readFileSync('./darkModernTheme.json'));

/**  @type {import('mdsvex').MdsvexOptions  } */
const mdsvexOptions = {
  extensions: ['.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await shiki.getHighlighter({ theme: darkModernTheme });
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
  remarkPlugins: [[emoji, { accessible: true }], a11yEmoji],
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
    adapter: adapter(),
    alias: {
      $components: path.resolve('src/lib/components'),
      $styles: path.resolve('src/lib/styles'),
      $scripts: path.resolve('src/lib/scripts'),
      $utils: path.resolve('src/lib/utils'),
      $posts: path.resolve('src/posts'),
    },
  },
};

export default config;
