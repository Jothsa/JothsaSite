<script lang="ts">
  let message = '';
</script>

<main id="content">
  <form>
    <h2>Contact</h2>
    <div><span>All fields required</span></div>
    <label
      >Name<input type="text" required autocomplete="name" name="name" /><span
        class="error-message">Name is required</span
      ></label>
    <label for="email"
      >Email<input type="email" name="email" required /><span
        class="error-message">A valid email is required</span
      ></label>
    <label
      >Message<textarea
        name="message"
        required
        minlength="10"
        placeholder="Hey Gabriella,
I was reading your book and..."
        rows="5"></textarea
      ><span class="error-message">Message is required</span></label>
    <label>Are you not a non-robot?<input type="checkbox" /></label>
    <button type="submit" class="button-contrast target-aaa">Submit</button>
  </form>
  <div id="message">{message}</div>
</main>

<style>
  main {
    padding: var(--space-xs);
  }

  form {
    display: grid;
    inline-size: 100%;
    min-inline-size: min(80svi, 60ch);
    gap: var(--space-s);
    grid-auto-flow: row;
    grid-template-columns: clamp(50svi, 45ch, 95svi);
  }

  h2 {
    margin: 0;
  }

  label {
    display: flex;
    min-inline-size: fit-content;
    /* inline-size: max-content; */
    flex-flow: row wrap;
    align-items: center;
    font-size: var(--step-1);
    gap: var(--space-xs);

    &:has(textarea) {
      flex-flow: column wrap;
      align-items: start;
    }
  }

  /*
   * [1] - needed because of the label flexbox align-items: start to place text at start
   */

  textarea {
    min-inline-size: min(80svi, 60ch);
    min-block-size: min(20svi, 10ch);
    align-self: center; /* [1] */
    padding: var(--space-3xs);
    font-size: var(--step-0);
  }

  input {
    font-size: var(--step-0);

    &:not([type='checkbox']) {
      min-inline-size: min(50svi, 20ch);
    }
  }

  button {
    inline-size: fit-content;
    border-radius: 1ch;
    font-size: var(--step-1);
  }

  .error-message {
    display: none;
    font-size: var(--step-0);
  }

  textarea,
  input:is([type='text'], [type='search'], [type='email']) {
    --error-bg: color-mix(in oklch, var(--error), var(--decrease-contrast) 45%);

    @supports not selector(input:user-invalid) {
      &:required:invalid:not(:focus, :placeholder-shown) {
        border-color: var(--error);
        background-color: var(--error-bg);

        & + .error-message {
          display: unset;
        }
      }
    }

    &:required:user-invalid:not(:focus, :placeholder-shown) {
      border-color: var(--error);
      background-color: var(--error-bg);

      & + .error-message {
        display: unset;
      }
    }
  }
</style>
