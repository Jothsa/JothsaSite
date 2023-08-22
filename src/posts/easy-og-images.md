---
title: Easy OG Images
description: Learn how to make easy OG images with one dependency 
date: '2023-08-21'
tags:
  - personal
  - programming
published: true
---

I wanted to generate OG images, but was getting frustrated with Satori and reSVG. I decided to make an svg template, replace some text with javascript, and use sharp to add a background and convert it to png. After sticking it on a SvelteKit endpoint, you have simple, pre-renderable, one dependency, open-graph images!

1. Create an svg template.

You can store this in a variable or an svg file, just make sure it gets imported as text (add ?raw to the end of the path when importing with Vite). This is a super simple example of a template. I recommend including your fonts as base64.

```html
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1910 1000" >
<text>${post-title}</text>
</svg>
```

```ts
// in vite, ?raw imports a file as a string
import template from './template.svg?raw';
import 'sharp';

// you'll need to get your post's metadata somehow.
template = template.replace('${post-title}, post.metadata.title);
const 
const img = sharp(Buffer.from(template));
```
