<script lang="ts">
</script>

<div class="quoteContainer">
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
  .quoteContainer {
    --bg-color: #f5f5f5;
    --grad: radial-gradient(circle at top left, #f00, #3020ff);
    --transition: 400ms scale 120ms ease-in-out;
    border-radius: 0.5em;
    padding: 0.25em;
    position: relative;
    transform-style: preserve-3d;
    border: double 4px transparent;
    background-image: linear-gradient(var(--bg-color), var(--bg-color)),
      var(--grad);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    transition: var(--transition);

    &::before {
      scale: 0.9; /* This way the shadow isn't visible at first. */
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
      scale: 1.025;
      &::before {
        scale: 1;
      }
    }
  }
</style>
