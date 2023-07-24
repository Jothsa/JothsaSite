export default {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-svelte'],
  // "pluginSearchDirs": ["."],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
