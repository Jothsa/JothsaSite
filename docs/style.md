# Naming

## Variables

In css use kebab-case, otherwise use camelCase. Booleans shall be prefixed with is as in isDark.

### Style Tokens

Color tokens shall be declared in a separate css file. Colors shall be prefixed with "color". Tokens will be imported from this file and assigned to variables indicating where they will be used. For example":

```css
@import 'themeTokens.css';

:root {
  --color-text-primary: var(--color-primary-contrast);
}
```

Tokens included shall be the following:

-
