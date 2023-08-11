<script lang="ts">
  import type { PostSlug } from '$scripts/GetContent';
  import { onMount } from 'svelte';
  /* @link https://una.im/radial-menu/
   */

  // store which reaction the user did locally (will help prevent spam)
  // 1 reaction per post?

  import { ReactionsList, isReactionDescription } from '$scripts/Reactions';
  import type { ReactionCounts, ReactionDescription } from '$scripts/Reactions';
  export let reactions: ReactionCounts;
  export let slug: PostSlug;
  let delayOverride = '';
  let selectedReaction: string | undefined = undefined;
  let reactionInputs: NodeListOf<HTMLInputElement>;
  let localReaction: ReactionDescription | '';

  // let {love, like, laugh, mindblown, celebrate, disappointed, skeptical, upset} = reactions;

  // * delay it should be on open/close
  const openDelay =
    '--delay: calc((var(--item-num) - 1) * var(--_delay-offset));';
  const closeDelay =
    ' --delay: calc((var(--total-items) - (var(--item-num))) * var(--_delay-offset));';
  // this should be the total time the transition takes (alliteration lol) in ms
  const totalTransitionTime = ReactionsList.length * 75;

  let menuButtonLabel = 'open menu';

  onMount(() => {
    const localReactionRaw = localStorage.getItem(`${slug}-reaction`);
    console.log('lrr', localReactionRaw);
    // def using a couple assumptions here, count can only be updated on reload, comp is mounted every reload, etc
    if (isReactionDescription(localReactionRaw)) {
      localReaction = localReactionRaw;
    } else {
      localReaction = '';
    }
    reactionInputs = document.querySelectorAll(
      '.reaction-menu  .reaction-input',
    ) as NodeListOf<HTMLInputElement>;
    if (localReaction !== '') {
      reactionInputs.forEach((r) => {
        if (r.value === localReaction) {
          console.log(`val: ${r.value}, lr: ${localReaction}`);
          r.checked = true;
        }
      });
    }
  });

  // the callbacks are not required but will help if the menu is closed by clicking away, not on the button
  function onOpenClick() {
    // in case the button is clicked mid-transition
    delayOverride = openDelay;
    menuButtonLabel = 'close menu';
    setTimeout(() => {
      delayOverride = closeDelay;
    }, totalTransitionTime);
  }

  function onCloseClick() {
    delayOverride = closeDelay;
    menuButtonLabel = 'open menu';
    setTimeout(() => {
      delayOverride = openDelay;
    }, totalTransitionTime);
  }

  async function onReactionClick(desc: ReactionDescription, event: Event) {
    // TODO choose ID, value, or other for desc
    // * this way the count can update without reloading
    // aria-checked?
    let previousReactionInputEl: HTMLInputElement | null = null;
    let previousReactionDesc: ReactionDescription | null = null;
    if (localReaction) {
      previousReactionInputEl = document.querySelector(
        `.reaction-menu .reaction-input[value='${localReaction}']`,
      ) as HTMLInputElement | null;
      if (
        previousReactionInputEl &&
        isReactionDescription(previousReactionInputEl.value)
      ) {
        previousReactionDesc = previousReactionInputEl.value;
      }
    }
    let clickedReactionInputEl: HTMLInputElement =
      event.target as HTMLInputElement;
    // maybe add more checks here
    let clickedReactionDesc: ReactionDescription =
      clickedReactionInputEl.value as ReactionDescription;
    let action: 'increment' | 'decrement' | 'swap' | undefined = undefined;
    let reaction: ReactionDescription | undefined = undefined;
    let swapFrom: ReactionDescription | '' = '';
    console.log(
      `desc: ${desc}, prevDesc: ${previousReactionDesc}, clickedDesc: ${clickedReactionDesc}`,
    );

    if (previousReactionInputEl === null) {
      action = 'increment';
      reaction = desc;
      localReaction = desc;
      reactions[reaction] = reactions[reaction] + 1;
    } else {
      if (previousReactionDesc === clickedReactionDesc) {
        action = 'decrement';
        reaction = desc;
        localReaction = '';
        clickedReactionInputEl.checked = false;
        reactions[reaction] = reactions[reaction] - 1;
      } else if (localReaction) {
        action = 'swap';
        swapFrom = localReaction;
        reaction = clickedReactionDesc;
        localReaction = clickedReactionDesc;
        reactions[swapFrom] = reactions[swapFrom] - 1;
        reactions[reaction] = reactions[reaction] + 1;
      } else {
        // log error idk
        console.log('uh oh idk reaction error of some kind');
      }
    }

    console.log(
      `action: ${action}, reaction: ${reaction}, localReaction: ${localReaction}`,
      reactions,
    );
    localStorage.setItem(`${slug}-reaction`, localReaction);

    if (action && reaction && slug) {
      const headers = {
        action: action,
        reaction: reaction,
        slug: slug,
        'swap-from': swapFrom,
      };
      console.log(headers);
      const res = await fetch('/api/posts/react', { headers: headers });
    }
  }
  // TODO Add easings to CSS transitions
</script>

<div
  class="reaction-menu radial-menu"
  style={`--total-items: ${ReactionsList.length}; ${delayOverride}`}>
  <button
    class="menu-toggle"
    id="menu-toggle"
    popovertarget="menu-items"
    aria-label={menuButtonLabel}
    title={menuButtonLabel}
    on:click={onOpenClick}>
    <span aria-hidden="true">➕</span>
  </button>
  <ul
    class="menu-items"
    id="menu-items"
    popover
    anchor="menu-toggle"
    role="menu">
    {#each ReactionsList as r, i}
      <li
        class="item"
        style={`--item-num: ${i + 1}; ${delayOverride}`}
        id={r.description}
        data-reaction-count={reactions?.[r.description] >= 0
          ? reactions[r.description]
          : 0}>
        <label>
          <input
            class="reaction-input"
            type="radio"
            role="menuitem"
            bind:group={selectedReaction}
            value={r.description}
            on:click={(event) => {
              onReactionClick(r.description, event);
            }} />

          <span class="reaction-emoji" aria-hidden="true">{r.emoji}</span>
          <span class="sr-only">{r.description}</span>
        </label>
      </li>
    {/each}
    <!--  Need extra close button bc the popover lays on top of the X and doesn't let you get to it    -->
    <li class="item">
      <button
        popovertargetaction="close"
        popovertarget="menu-items"
        class="hidden-close"
        aria-label="close menu"
        title="close menu"
        on:click={onCloseClick}>
        <span aria-hidden="true"> </span>
      </button>
    </li>
  </ul>
</div>

<style>
  .radial-menu {
    /* Custom Properties for the menu
     * properties beginning with _ shouldn't need to be changed
     * [1] full-rotation controls how far around the menu the items will be when it is open 
     *  180deg keeps them on the top half, 360deg puts them all around the menu in a full circle, etc 
     * [2] delay-offset controls the offset between each item's transitions
     * [3] max-opening-time sets the max time for the menu to open, this can override delay offset
     *     set it to a large value to ignore it, or just set it to not bother with delay-offset
     * [4] a large fallback time is given to delay-offset so if it isn't set the calc basically ignores it
     */
    --btn-size: 3rem;
    --extra-space: 1.5rem;
    --full-rotation: 360deg; /* [1] */
    --delay-offset: 75ms; /* [2] */
    --max-opening-time: 1.2s; /* [3] */
    --_base-angle: calc(var(--full-rotation) / var(--total-items));
    --_delay-offset: min(
      var(--delay-offset, 999s),
      (var(--max-opening-time) / (var(--total-items) - 1))
    ); /* [4] */
    inline-size: min-content;
    block-size: min-content;
    padding: 0;

    & .menu-items {
      padding: 0;
      border: none;
      margin: 0;
    }

    & span {
      padding: 0;
      margin: 0;
      vertical-align: baseline;
    }

    & :is(button, input) {
      border: none;
      margin: 0;
      appearance: none;
      background: none;
      color: #222;
      font-family: 'Noto Emoji';
      font-size: 1.25rem;

      &:focus-visible {
        border-radius: 50%;
        aspect-ratio: 1/1;
        outline: 2px dashed deeppink;
      }
    }

    /* Where the magic happens */
    & .item {
      --angle: calc(var(--_base-angle) * (var(--item-num) - 1));
      --delay: calc((var(--item-num) - 1) * var(--_delay-offset));
      --radius: calc(var(--btn-size) + var(--extra-space));
      --bg: var(--accent);
      position: relative;
      width: var(--btn-size);
      border-radius: 50%;
      aspect-ratio: 1;
      background-color: var(--bg);
      opacity: 0;
      transform: translateX(calc(cos(var(--angle)) * var(--radius)))
        translateY(calc(sin(var(--angle) * -1) * var(--radius))) rotate(0deg);
      transition-delay: var(--delay);
      transition-duration: 300ms;

      /* why does all work but not specific props */
      transition-property: all;
      transition-timing-function: ease;
      user-select: none;

      &:has(:checked) {
        --bg: skyblue;
      }

      &:has(.hidden-close) {
        background: none;
      }
    }

    & .item:has(.reaction-emoji)::after {
      --size: 2ch;
      position: absolute;
      inset-block-start: 0;
      inset-inline-end: 0;
      inline-size: var(--size);
      block-size: var(--size);
      padding: 0;
      border-radius: 50%;
      aspect-ratio: 1;
      background: var(--tertiary);
      color: var(--text-secondary);
      content: attr(data-reaction-count);
      font-weight: 600;
      line-height: var(--size);
      opacity: 0;
      text-align: center;
      transform: translate(40%, -40%);
      transition: opacity 300ms ease-in-out;
    }

    & .item:has(.reaction-emoji):hover::after {
      opacity: 1;
    }

    & :popover-open .item {
      opacity: 1;
    }

    /* Adding for popover base */

    & .menu-items:not(:popover-open) .item {
      --radius: 0;
      --angle: 0;

      /* --delay: calc(
        (var(--total-items) - (var(--item-num))) * var(--_delay-offset)
      ); */
      rotate: 45deg;
    }

    /* & .menu-items:popover-open .item {
      
    } */

    & .menu-toggle {
      z-index: 1;
      width: var(--btn-size);
      border-radius: 50%;
      aspect-ratio: 1;
      background: darksalmon;
    }

    & .hidden-close {
      width: var(--btn-size);
      aspect-ratio: 1;
      background: none;
      transform: rotate(45deg);
      transition: opacity 0.1s;
      transition-delay: 1s;
    }
  }

  /* rotate the "plus" */
  .menu-toggle > span {
    display: inline-block;
    transition: transform 0.3s;
  }

  .radial-menu:has(:popover-open) .menu-toggle span:not(.sr-only) {
    transform: rotate(45deg);
  }

  .menu-items {
    bottom: calc(anchor(bottom));
    left: anchor(center);

    /*  popover override  */
    background: none;
    translate: -50% 0;
  }

  /* Every item gets a background, angle, and delay */

  /* This gets updated when the popover is open */

  /* Grid piles */

  .radial-menu,
  .menu-items,
  .item {
    display: grid;
    place-content: center;
  }

  .radial-menu > *,
  .menu-items > *,
  .item :is(button, input) {
    grid-area: 1/1;
  }

  /* Resets, etc. */

  .radial-menu,
  .menu-items {
    overflow: unset;
  }
</style>
