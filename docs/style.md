## General

# Formatting

Spaces shall be used instead of tabs with a width of 2. Single quotes shall be used when possible. Notable exceptions include html attributes and json files. Trailing commas shall follow the es5 syntax. Semicolons shall be used whenever possible.

### Naming

Use camelCase with a lower first letter in most instances. Boolean variables shall be prefixed with is as in isDark.

## CSS

### Naming

In css use kebab-case for variables. If needed, the class name of containing elements shall be "container".

### Colors

All colors shall be in the oklch format.

### Style Tokens

The color palette tokens shall be declared in a separate css file. This file should contain every unique color used in the project (Note that colors may be modified in use such as with filters). When tokens are to be used, they will be imported from this file and assigned to variables indicating where they will be used. For example:

```css
@import 'themeTokens.css';

:root {
  --color-text-primary: var(--color-primary-contrast);
  --color-main-bg: var(--color-primary);
}
```

Colors shall be prefixed with "color". They shall be named --color-(primary | secondary | tertiary)?-(accent | contrast), giving up to 9 colors. Main colors not have accent or contrast suffix in their name. They should usually have lower chroma values. Accent colors should be used sparingly and should usually have a high chroma value. Contrast colors shall have a different lightness and should meet the APCA contrast of L<sup>c</sup> 60.
