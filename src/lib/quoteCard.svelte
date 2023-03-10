<script lang="ts" context="module">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const generateConicCSS = () => {
    let css = '@keyframes rotate-fallback {';
    for (let i = 0; i <= 100; i++) {
      css = `${css}
  ${i}% { background-image: linear-gradient(var(--bg-color), var(--bg-color)), conic-gradient(from ${(
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
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // injectCSS(generateConicCSS());
  // console.log(generateCSS());
  // console.log(generateShadowCSS());
</script>

<script lang="ts">
  import { anim } from '$lib/stores/anim';
  export let theme = 'default';
  let classes = theme + ' quoteContainer';

  interface $$Slots {
    default: never;
    quoteText: unknown;
    quoteAuthor: unknown;
    quoteSource: unknown;
  }

  interface $$Props {
    theme?: string;
  }
</script>

<div class={classes} class:anim={$anim}>
  <blockquote>
    <slot name="quoteText" />
  </blockquote>
  <cite>
    {#if $$slots.quoteAuthor && $$slots.quoteSource}
      <span class="quoteAuthor">
        <slot name="quoteAuthor" />
      </span>
      in
      <span class="quoteSource">
        <slot name="quoteSource" />
      </span>
    {:else if $$slots.quoteAuthor}
      <span class="quoteAuthor">
        <slot name="quoteAuthor" />
      </span>
    {:else if $$slots.quoteSource}
      <span class="quoteSource">
        <slot name="quoteSource" />
      </span>
    {/if}
  </cite>
</div>

<style lang="postcss">
  @import 'open-props/masks/corner-cuts';

  @font-face {
    font-display: swap;
    font-family: 'Star Jedi';
    font-style: normal;
    font-weight: normal;
    src: url('/fonts/StarJedi.woff2') format('woff2'),
      url('/fonts/StarJedi.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Tengwar Telcontar';
    font-style: normal;
    font-weight: normal;
    src: url('fonts/tengtelc.woff2') format('woff2'),
      url('fonts/tengtelc.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Tengwar Telcontar';
    font-style: normal;
    font-weight: bold;
    src: url('fonts/tengtelcb.woff2') format('woff2'),
      url('fonts/tengtelcb.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Moon Dance';
    font-style: normal;
    font-weight: normal;
    src: url('fonts/MoonDance-Regular.woff2') format('woff2'),
      url('fonts/MoonDance-Regular.woff') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: Tolkien;
    font-style: normal;
    font-weight: normal;
    src: url('fonts/Tolkien.woff2') format('woff2'),
      url('fonts/Tolkien.woff') format('woff');
  }

  @define-mixin quoteMixin {
    /* * kind of hacky, but it works */
    --quote-size: 12rem;
    position: absolute;
    display: inline-block;
    overflow: visible;
    width: 3rem;
    height: 3rem;
    font-size: clamp(1rem, var(--quote-size), 20vmax);
    line-height: 0.75;
    opacity: 0.075;
    vertical-align: middle;
  }

  /* TODO Add max values for rem unit stuff */
  .quoteContainer {
    --bg-color: oklch(97.02% 0 0);

    /* height: 15ch; */
    padding: clamp(min(0.2rem, 15vmin), 0.3rem, 20vmin);
    border-radius: var(--radius-3);
    background: var(--bg-color);
    font-size: var(--font-size-fluid-1);

    & blockquote {
      position: relative;

      &::before {
        @mixin quoteMixin;

        /* should be -1/2 of the font size + the offset from the top */
        top: 0;
        left: 0;
        display: inline-block;
        height: max-content;
        content: '\201C';
      }

      /* &::after {
        @mixin quoteMixin;
        right: min(1rem, 2vmax);
        bottom: 0;
        content: '\201D';
      } */
    }

    /* stylelint-disable-next-line selector-class-pattern */
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
      border: double var(--border-size-4) transparent;
      background-clip: padding-box, border-box;
      background-image: linear-gradient(var(--bg-color), var(--bg-color)),
        var(--border-grad);
      background-origin: border-box;
    }

    /* stylelint-disable-next-line selector-class-pattern */
    &.TheLordoftheRings {
      /* --grad-angle: 0deg;
      --grad-offset: 0deg;
      --gold: oklch(81.97% 0.156 74.37);
      --light-shadow: oklch(47.92% 0.085 78.76);
      border: double var(--border-size-4) transparent;
      background-clip: padding-box, border-box;
      background-image: linear-gradient(var(--bg-color), var(--bg-color)),
        repeating-linear-gradient(
          105deg,
          var(--gold) 0%,
          var(--light-shadow) 20%,
          var(--gold) 27%
        );
      background-origin: border-box; */

      border-top: oklch(76.65% 0.139 91.06) solid var(--border-size-3);
      border-bottom: oklch(76.65% 0.139 91.06) solid var(--border-size-3);
      background: var(--bg-color);
      font-family: 'Moon Dance', serif;
      -webkit-mask: var(--mask-corner-cut-angles-1);
    }

    /* stylelint-disable-next-line selector-class-pattern */
    &.JRRTolkien {
      border-right: oklch(76.65% 0.139 91.06) solid var(--border-size-3);
      border-left: oklch(76.65% 0.139 91.06) solid var(--border-size-3);
      font-family: Tolkien, serif;
      -webkit-mask: var(--mask-corner-cut-angles-1);
    }
  }

  .quoteSource {
    font-family: 'Tengwar Telcontar', serif;

    /* should be 1.2 times the quote text size */
    font-size: 1.2em;
    font-weight: normal;
  }

  @media (prefers-reduced-motion: no-preference) {
    /* stylelint-disable-next-line selector-class-pattern */
    .TheLordoftheRings .quoteSource {
      animation: moveBG 8s linear infinite;
    }

    /* stylelint-disable selector-class-pattern */
    .StarWars,
    .TheLordoftheRings .quoteSource {
      animation-play-state: paused;
    }
    /* stylelint-enable selector-class-pattern */

    /* stylelint-disable selector-class-pattern */
    :global(.anim) .StarWars,
    :global(.anim) .TheLordoftheRings .quoteSource {
      animation-play-state: running;
    }
    /* stylelint-enable selector-class-pattern */

    /* stylelint-disable plugin/no-low-performance-animation-properties */
    @keyframes moveBG {
      to {
        background-position: var(--bg-size) 0;
      }
    }
    /* stylelint-enable plugin/no-low-performance-animation-properties */

    @keyframes rotate {
      to {
        --grad-angle: 360deg;
      }
    }
  }

  /* TODO Better fallback fonts */
  /* stylelint-disable-next-line selector-class-pattern */
  .StarWars .quoteSource {
    font-family: 'Star Jedi', serif;
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .TheLordoftheRings .quoteSource {
    --color-one: oklch(80.78% 0 0);
    --color-two: oklch(76.65% 0.139 91.06);
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
    background-clip: text;
    color: transparent;
    font-family: 'Tengwar Telcontar', serif;
  }

  /* TODO Randomize starting angle (use cicada principle maybe) */
  @supports (background: paint(worklet)) {
    /* maybe this could be in .radGradBorderAnimated? It shouldn't matter ig */
    @property --grad-angle {
      inherits: false;
      initial-value: 0deg;
      syntax: '<angle>';
    }
  }

  @supports not (background: paint(worklet)) {
    @media (prefers-reduced-motion: no-preference) {
      /* stylelint-disable-next-line selector-class-pattern */
      .StarWars {
        animation: 10s rotateFallback linear infinite;
        animation-play-state: paused;
      }
    }
    /* stylelint-disable plugin/no-low-performance-animation-properties */
    @keyframes rotateFallback {
      0% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 0deg, var(--border-grad-colors));
      }

      1% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 3.6deg, var(--border-grad-colors));
      }

      2% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 7.2deg, var(--border-grad-colors));
      }

      3% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 10.8deg, var(--border-grad-colors));
      }

      4% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 14.4deg, var(--border-grad-colors));
      }

      5% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 18deg, var(--border-grad-colors));
      }

      6% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 21.6deg, var(--border-grad-colors));
      }

      7% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 25.2deg, var(--border-grad-colors));
      }

      8% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 28.8deg, var(--border-grad-colors));
      }

      9% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 32.4deg, var(--border-grad-colors));
      }

      10% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 36deg, var(--border-grad-colors));
      }

      11% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 39.6deg, var(--border-grad-colors));
      }

      12% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 43.2deg, var(--border-grad-colors));
      }

      13% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 46.8deg, var(--border-grad-colors));
      }

      14% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 50.4deg, var(--border-grad-colors));
      }

      15% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 54deg, var(--border-grad-colors));
      }

      16% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 57.6deg, var(--border-grad-colors));
      }

      17% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 61.2deg, var(--border-grad-colors));
      }

      18% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 64.8deg, var(--border-grad-colors));
      }

      19% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 68.4deg, var(--border-grad-colors));
      }

      20% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 72deg, var(--border-grad-colors));
      }

      21% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 75.6deg, var(--border-grad-colors));
      }

      22% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 79.2deg, var(--border-grad-colors));
      }

      23% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 82.8deg, var(--border-grad-colors));
      }

      24% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 86.4deg, var(--border-grad-colors));
      }

      25% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 90deg, var(--border-grad-colors));
      }

      26% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 93.6deg, var(--border-grad-colors));
      }

      27% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 97.2deg, var(--border-grad-colors));
      }

      28% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 100.8deg, var(--border-grad-colors));
      }

      29% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 104.4deg, var(--border-grad-colors));
      }

      30% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 108deg, var(--border-grad-colors));
      }

      31% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 111.6deg, var(--border-grad-colors));
      }

      32% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 115.2deg, var(--border-grad-colors));
      }

      33% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 118.8deg, var(--border-grad-colors));
      }

      34% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 122.4deg, var(--border-grad-colors));
      }

      35% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 126deg, var(--border-grad-colors));
      }

      36% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 129.6deg, var(--border-grad-colors));
      }

      37% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 133.2deg, var(--border-grad-colors));
      }

      38% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 136.8deg, var(--border-grad-colors));
      }

      39% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 140.4deg, var(--border-grad-colors));
      }

      40% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 144deg, var(--border-grad-colors));
      }

      41% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 147.6deg, var(--border-grad-colors));
      }

      42% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 151.2deg, var(--border-grad-colors));
      }

      43% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 154.8deg, var(--border-grad-colors));
      }

      44% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 158.4deg, var(--border-grad-colors));
      }

      45% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 162deg, var(--border-grad-colors));
      }

      46% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 165.6deg, var(--border-grad-colors));
      }

      47% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 169.2deg, var(--border-grad-colors));
      }

      48% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 172.8deg, var(--border-grad-colors));
      }

      49% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 176.4deg, var(--border-grad-colors));
      }

      50% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 180deg, var(--border-grad-colors));
      }

      51% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 183.6deg, var(--border-grad-colors));
      }

      52% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 187.2deg, var(--border-grad-colors));
      }

      53% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 190.8deg, var(--border-grad-colors));
      }

      54% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 194.4deg, var(--border-grad-colors));
      }

      55% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 198deg, var(--border-grad-colors));
      }

      56% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 201.6deg, var(--border-grad-colors));
      }

      57% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 205.2deg, var(--border-grad-colors));
      }

      58% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 208.8deg, var(--border-grad-colors));
      }

      59% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 212.4deg, var(--border-grad-colors));
      }

      60% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 216deg, var(--border-grad-colors));
      }

      61% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 219.6deg, var(--border-grad-colors));
      }

      62% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 223.2deg, var(--border-grad-colors));
      }

      63% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 226.8deg, var(--border-grad-colors));
      }

      64% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 230.4deg, var(--border-grad-colors));
      }

      65% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 234deg, var(--border-grad-colors));
      }

      66% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 237.6deg, var(--border-grad-colors));
      }

      67% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 241.2deg, var(--border-grad-colors));
      }

      68% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 244.8deg, var(--border-grad-colors));
      }

      69% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 248.4deg, var(--border-grad-colors));
      }

      70% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 252deg, var(--border-grad-colors));
      }

      71% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 255.6deg, var(--border-grad-colors));
      }

      72% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 259.2deg, var(--border-grad-colors));
      }

      73% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 262.8deg, var(--border-grad-colors));
      }

      74% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 266.4deg, var(--border-grad-colors));
      }

      75% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 270deg, var(--border-grad-colors));
      }

      76% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 273.6deg, var(--border-grad-colors));
      }

      77% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 277.2deg, var(--border-grad-colors));
      }

      78% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 280.8deg, var(--border-grad-colors));
      }

      79% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 284.4deg, var(--border-grad-colors));
      }

      80% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 288deg, var(--border-grad-colors));
      }

      81% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 291.6deg, var(--border-grad-colors));
      }

      82% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 295.2deg, var(--border-grad-colors));
      }

      83% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 298.8deg, var(--border-grad-colors));
      }

      84% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 302.4deg, var(--border-grad-colors));
      }

      85% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 306deg, var(--border-grad-colors));
      }

      86% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 309.6deg, var(--border-grad-colors));
      }

      87% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 313.2deg, var(--border-grad-colors));
      }

      88% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 316.8deg, var(--border-grad-colors));
      }

      89% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 320.4deg, var(--border-grad-colors));
      }

      90% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 324deg, var(--border-grad-colors));
      }

      91% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 327.6deg, var(--border-grad-colors));
      }

      92% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 331.2deg, var(--border-grad-colors));
      }

      93% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 334.8deg, var(--border-grad-colors));
      }

      94% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 338.4deg, var(--border-grad-colors));
      }

      95% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 342deg, var(--border-grad-colors));
      }

      96% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 345.6deg, var(--border-grad-colors));
      }

      97% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 349.2deg, var(--border-grad-colors));
      }

      98% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 352.8deg, var(--border-grad-colors));
      }

      99% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 356.4deg, var(--border-grad-colors));
      }

      100% {
        background-image: linear-gradient(var(--bg-color), var(--bg-color)),
          conic-gradient(from 360deg, var(--border-grad-colors));
      }
    }
    /* stylelint-enable plugin/no-low-performance-animation-properties */
  }
</style>
