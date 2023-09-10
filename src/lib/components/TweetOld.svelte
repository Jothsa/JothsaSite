<script lang="ts">
  export let account: string = '@GabriellaSaab_';
  export let author: string = '@GabriellaSaab_';
  const retweet = author !== account;
  export let tweetTitle: string;
  export let link: string;
  export let date: string;

  // 2 kinds of retweets
  // if a comment is added to the retweet, the tweet is embedded and must be fetched
  // if no comment, only the title is changed
</script>

<div class="tweet">
  <a href={link}>{tweetTitle}</a>
  <p>{date}</p>
  <slot />
</div>

<style>
  div {
    inline-size: 30ch;
    padding: var(--space-2xs);
    border: solid 2px var(--accent);
  }
</style>
