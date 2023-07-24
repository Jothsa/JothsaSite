export default {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSameLine: true,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
};
