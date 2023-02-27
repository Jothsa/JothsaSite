const jit = require('postcss-jit-props');
const presetEnv = require('postcss-preset-env');
const openProps = require('open-props');
const mixins = require('postcss-mixins');

const config = {
  plugins: [
    jit(openProps),
    mixins(),
    presetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    }),
  ],
};

module.exports = config;
