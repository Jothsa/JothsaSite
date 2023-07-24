---
title: Unread badge
description: How I made an unread badge
date: '2023-07-20'
tags:
  - programming
published: true
---

I was inspired by [Una Kravets](https://una.im/hacking-visited/) but wanted a corner unread badge. This was extremely tricky to do because most methods to create the badge used properties that couldn't be adjusted via `:visited`. TODO add which properties can be adjusted and which can't

I ended up using [this technique](https://stackoverflow.com/a/30505151) with a bunch of link elements. Pseudo elements kept giving me trouble for some reason (maybe sveltekit's css parser, csstree's poor nesting support). I used the `aria-hidden` and `inert` attributes together with `tabindex="-1"` to hide this monstrosity from screen readers and user interactions. To place it behind my card's border, I removed the border from the card and added an element inside the card to have the border.
I don't think I can recommend this technique for production, but since I didn't want to track the user's visits with cookies or something this works well enough.
Why do we have these restrictions on :visited? They seem pretty arbitrary and I can't imagine they do much to protect privacy if the browser lies anyway.
Overall, I'm pretty proud of the result, especially since it feels like something _I_ did rather than just copying and pasting (not that copying and pasting wasn't involved :laughing:). It just looks _so_ cool! I'd love to see this used in more places!
The border effect is super cool. Stay tuned for a blog post detailing the simple technique. Or check out the source code and see for yourself.

```svelte
<li class="post">
  <a class="unread" href={`/blog/${post.slug}`} aria-hidden="true" inert
    ><!-- svelte-ignore a11y-missing-content --><a
      class="unread-l"
      href={`/blog/${post.slug}`} />(unread!)<!-- svelte-ignore a11y-missing-content --><a
      class="unread-r"
      href={`/blog/${post.slug}`} /></a>
  <div class="post-border" />
  <!-- rest of content -->
</li>
```

```css
.post {
  & .post-border {
    position: absolute;
    border: var(--border);
    border-image: var(--border-grad) 1;
    inset: 0;
  }

  & .unread {
    --ribbon-bg: var(--contrast);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    padding-block: 0.5ch;
    margin: 0;
    background-color: var(--ribbon-bg);
    font-size: var(--step--1-cqi);
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transform: translateX(30%) translateY(0%) rotate(45deg);
    transform-origin: top left;

    & .unread-l,
    & .unread-r {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      margin: 0 -1px;
      background-color: inherit;
      content: '';
    }

    & .unread-l {
      inset-inline-end: 100%;
    }

    & .unread-r {
      inset-inline-start: 100%;
    }

    &:visited,
    & :is(.unread-l, .unread-r):visited {
      background-color: var(--card-bg);
      color: var(--card-bg);
    }
  }
}
```
