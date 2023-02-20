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

<style>
  div.quoteContainer {
    border: solid 3px darkblue;
    border-radius: 0.5em;
    padding: 0.25em;
    background-color: #f5f5f5;
  }
</style>
