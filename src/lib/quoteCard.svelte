<script lang="ts">
  export let theme = 'default';
  let classes = theme + ' quoteContainer';
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
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
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
    --grad: linear-gradient(
      -45deg,
      oklch(70.15% 0.168 263.12),
      oklch(41.03% 0.254 263.12),
      oklch(82.5% 0.094 263.12),
      oklch(47.79% 0.308 267.35)
    );
    --transition: 400ms scale 120ms ease-in-out;
    border-radius: var(--radius-3);
    padding: 0.25em;
    position: relative;
    transform-style: preserve-3d;
    border: double var(--border-size-4) transparent;
    background-image: linear-gradient(var(--bg-color), var(--bg-color)),
      var(--grad);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: var(--transition);

    &.StarWars {
      --angle: 0deg;
      --grad: linear-gradient(var(--angle), blue, silver, navy, red);
    }

    &::before {
      scale: 1.025; /* This can make the shadow invisible at first if <1. */
      transition: var(--transition);
      --spread: -3px;
      --grad-shadow: var(--grad);
      --x-offset: 8px;
      --y-offset: 6px;
      --blur: 10px;
      content: '';
      position: absolute;
      border-radius: inherit;
      inset: var(--spread);
      transform: translate3d(
        var(--x-offset),
        var(--y-offset),
        -1px
      ); /* (X, Y, Z) */
      background: var(--grad-shadow);
      filter: blur(var(--blur));
    }

    /* technically the card isn't focusable. Maybe i should change that? */
    &:hover,
    &:focus-within {
      scale: 1.04;
      &::before {
        scale: 1.025;
      }
    }
  }

  .quoteSource {
    font-weight: normal;
    font-size: normal;
    font-family: 'Tengwar Telcontar';
  }

  @media (prefers-reduced-motion: no-preference) {
    .quoteSource {
      animation: move-bg 8s linear infinite;
    }

    .StarWars {
      animation: 10s rotate linear infinite;
    }
    @keyframes move-bg {
      to {
        background-position: var(--bg-size) 0;
      }
    }
    @keyframes rotate {
      to {
        --angle: 360deg;
      }
    }
  }

  /* TODO Better fallback fonts */
  .StarWars .quoteSource {
    --color-one: #000;
    --color-two: #ffe81f;
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
</style>
