/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const presetEnv = require('postcss-preset-env');
// const jit = require('postcss-jit-props');
// const postcssImport = require('postcss-import');
// const mixins = require('postcss-mixins');
// const customMedia = require('postcss-custom-media');

const config = {
  plugins: [
    // postcssImport(),
    // mixins(),
    // customMedia(),
    presetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
        // 'custom-media': true,
        // 'custom-selectors': true,
        // 'blank-pseudo-class': true
      },
    }),
    // jit({
    //   files: ['./src/styles/props.postcss'],
    // }),
  ],
};

module.exports = config;

