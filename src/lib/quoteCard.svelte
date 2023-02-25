<script lang="ts" context="module">
  const generateConicCSS = () => {
    let css = '@keyframes conic-rotate {';
    for (let i = 0; i <= 100; i++) {
      css = `${css}
  ${i}% { background-image: linear-gradient(var(--bg-color), var(--bg-color)) conic-gradient(from ${(
        (360 * i) /
        100
      ).toFixed(2)}deg, var(--border-grad-colors)); }`;
    }

    return `${css}
    }`;
  };

  const injectCSS = (css: string) => {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  // injectCSS(generateConicCSS());
  // console.log(generateCSS());
  // console.log(generateShadowCSS());
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  export let theme = 'default';
  let classes = theme + ' quoteContainer';
  interface $$Slots {
    default: never;
    quoteText: {};
    quoteAuthor: {};
    quoteSource: {};
  }

  interface $$Props {
    theme?: string;
  }
</script>

<div class={classes}>
  <blockquote>
    <slot name="quoteText">
      <!-- All right. Well, take care of yourself, Han. I guess that's what you're
      best at, ain't it? All right. Well, take care of yourself, Han. I guess
      that's what you're best at, ain't it? You are a part of the Rebel Alliance
      and a traitor! Take her away! You mean it controls your actions? She must
      have hidden the plans in the escape pod. Send a detachment down to
      retrieve them, and see to it personally, Commander. There'll be no one to
      stop us this time! Ye-ha! Escape is not his plan. I must face him, alone.
      I don't know what you're talking about. I am a member of the Imperial
      Senate on a diplomatic mission to Alderaan-- But with the blast shield
      down, I can't even see! How am I supposed to fight? -->
    </slot>
  </blockquote>
  <cite>
    {#if $$slots.quoteAuthor && $$slots.quoteSource}
      <span class="quoteAuthor">
        <slot name="quoteAuthor">
          <!--Star Wars-->
        </slot>
      </span>
      in
      <span class="quoteSource">
        <slot name="quoteSource">
          <!--Fillerama-->
        </slot>
      </span>
    {:else if $$slots.quoteAuthor}
      <span class="quoteAuthor">
        <slot name="quoteAuthor">
          <!--Star Wars-->
        </slot>
      </span>
    {:else if $$slots.quoteSource}
      <span class="quoteSource">
        <slot name="quoteSource">
          <!--Fillerama-->
        </slot>
      </span>
    {/if}
  </cite>
</div>

<style lang="postcss">
  @font-face {
    font-family: 'Star Jedi';
    src: url('/fonts/StarJedi.woff2') format('woff2'),
      url('/fonts/StarJedi.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Tengwar Telcontar';
    src: url('fonts/tengtelc.woff2') format('woff2'),
      url('fonts/tengtelc.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Tengwar Telcontar';
    src: url('fonts/tengtelcb.woff2') format('woff2'),
      url('fonts/tengtelcb.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  .quoteContainer {
    --bg-color: #f5f5f5;
    background-color: (var(--bg-color));
    border-radius: var(--radius-3);
    padding: 0.25em;

    &.StarWars {
      --grad-angle: 0deg;
      --grad-offset: 0deg;
      --border-grad-colors: oklch(70.15% 0.168 263.12),
        oklch(41.03% 0.254 263.12), oklch(82.5% 0.094 263.12),
        oklch(47.79% 0.308 267.35), oklch(70.15% 0.168 263.12);
      --border-grad: conic-gradient(
        from var(--grad-angle),
        var(--border-grad-colors)
      );
      background-origin: border-box;
      background-clip: padding-box, border-box;
      border: double var(--border-size-4) transparent;
      background-image: linear-gradient(var(--bg-color), var(--bg-color)),
        var(--border-grad);
    }
  }

  .quoteSource {
    font-weight: normal;
    font-size: normal;
    font-family: 'Tengwar Telcontar', serif;
  }

  @media (prefers-reduced-motion: no-preference) {
    .TheLordoftheRings .quoteSource {
      animation: move-bg 8s linear infinite;
    }

    .StarWars {
      animation: rotate 10s linear infinite;
    }
    @keyframes move-bg {
      to {
        background-position: var(--bg-size) 0;
      }
    }
    @keyframes rotate {
      to {
        --grad-angle: 360deg;
      }
    }
  }

  /* TODO Better fallback fonts */
  .StarWars .quoteSource {
    font-family: 'Star Jedi', serif;
  }
  .TheLordoftheRings .quoteSource {
    --color-one: silver;
    --color-two: #d4af37;
    --bg-move-dur: 35s;
    --angle: 90deg;
    --bg-size: 400%;
    background: linear-gradient(
        var(--angle),
        var(--color-one),
        var(--color-two),
        var(--color-one)
      )
      0 0 / var(--bg-size) 100%;
    color: transparent;
    background-clip: text;
    font-family: 'Tengwar Telcontar', serif;
  }

  /*TODO Randomize starting angle (use cicada principle maybe) */
  @supports (background: paint(worklet)) {
    /* maybe this could be in .radGradBorderAnimated? It shouldn't matter ig */
    @property --grad-angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
  }

  @supports not (background: paint(worklet)) {
    .StarWars {
      --border-grad: conic-gradient(from 0deg, var(--border-grad-colors));
      @media (prefers-reduced-motion: no-preference) {
        animation: 10s rotate-fallback linear infinite;
      }
    }
  }
</style>
