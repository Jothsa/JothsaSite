<script lang="ts">
  import { isPostSlug, type PostSlug } from '$scripts/GetContent';
  import { onMount } from 'svelte';
  /* @link https://una.im/radial-menu/
   */

  // store which reaction the user did locally (will help prevent spam)
  // 1 reaction per post?

  import {
    ReactionsList,
    isReactionDescription,
    makeReactionRequest,
  } from '$scripts/Reactions';
  import type { ReactionCounts, ReactionDescription } from '$scripts/Reactions';
  export let reactions: ReactionCounts;
  export let slug: PostSlug;
  let delayOverride = '';
  let reactionInputs: NodeListOf<ReactionInputElementType>;
  let localReaction: ReactionDescription | '';
  type ReactionInputElementType = HTMLButtonElement;

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
    reactionInputs = getAllReactionInputEls();
  });

  // the callbacks are not required but will help if the menu is closed by clicking away, not on the button
  async function onOpenClick() {
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

  function getAllReactionInputEls(): NodeListOf<ReactionInputElementType> {
    return document.querySelectorAll(
      `.reaction-menu .reaction-input`,
    ) as NodeListOf<ReactionInputElementType>;
  }
  function getReactionFromEL(
    el: ReactionInputElementType,
  ): ReactionDescription | null {
    console.log(el, el.id);
    if (isReactionDescription(el.id)) return el.id;
    else return null;
  }
  function getReactionElByDesc(
    d: ReactionDescription,
  ): ReactionInputElementType | null {
    console.log(document.querySelector(`.reaction-menu #${d}`));
    return document.getElementById(d) as ReactionInputElementType | null;
  }

  function getReactionEl(
    input: ReactionDescription | ReactionInputElementType,
  ): ReactionInputElementType | null {
    if (typeof input === 'string') {
      return getReactionElByDesc(input);
    } else return input;
  }

  function setReactionElSelected(
    input: ReactionInputElementType | ReactionDescription,
    isSelected: boolean,
  ) {
    const el = getReactionEl(input);

    if (el) {
      // console.log(el, 'is', isSelected);
      console.log(`el: ${el.id} is: ${isSelected}, ip: ${el.ariaPressed}, `);
      el.setAttribute('aria-pressed', isSelected.toString());
      // el.ariaPressed = isSelected.toString();
    }
  }

  /**
   * deselects all reaction inputs, if an input is provides, selects the input
   * @param input
   */
  function selectReactionEl(
    input: ReactionInputElementType | ReactionDescription | null,
  ) {
    const allEls = getAllReactionInputEls();

    allEls.forEach((e) => {
      setReactionElSelected(e, false);
    });
    console.log('i', input);
    if (input !== null) {
      let el: ReactionInputElementType | null = getReactionEl(input);
      if (el !== null) {
        setReactionElSelected(el, true);
      }
    }
  }

  /**
   *
   * @param to - the reaction to select
   * @param from - the reaction to deselect
   */
  function swapReactionEl(
    to: ReactionInputElementType | ReactionDescription,
    from: ReactionInputElementType | ReactionDescription,
  ) {
    let toEl: ReactionInputElementType | null = getReactionEl(to);
    let fromEl: ReactionInputElementType | null = getReactionEl(from);
    if (toEl && fromEl) {
      selectReactionEl(toEl);
    }
  }

  async function onReactionClick(desc: ReactionDescription, event: Event) {
    // TODO choose ID, value, or other for desc
    // * this way the count can update without reloading
    // aria-pressed?
    // desc is the reaction value of the clicked element
    let previousReactionInputEl: ReactionInputElementType | null = null;
    let previousReactionDesc: ReactionDescription | null = null;
    if (localReaction) {
      previousReactionInputEl = getReactionEl(localReaction);
      if (previousReactionInputEl) {
        previousReactionDesc = getReactionFromEL(previousReactionInputEl);
        // in this case local reaction === prev reaction
      }
    }
    // event.currentTarget should always get the button even if descendant (ex span) is clicked
    let clickedReactionInputEl: ReactionInputElementType =
      event.currentTarget as ReactionInputElementType;
    // maybe add more checks here
    let clickedReactionDesc: ReactionDescription = getReactionFromEL(
      clickedReactionInputEl,
    ) as ReactionDescription;
    let action: 'increment' | 'decrement' | 'swap' | undefined = undefined;
    let reaction: ReactionDescription | undefined = undefined;
    let swapFrom: ReactionDescription | '' = '';
    // console.log(
    //   `desc: ${desc}, prevDesc: ${previousReactionDesc}, clickedDesc: ${clickedReactionDesc}`,
    // );

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
        reactions[reaction] = reactions[reaction] - 1;
      } else if (localReaction) {
        action = 'swap';
        swapFrom = localReaction;
        reaction = clickedReactionDesc;
        localReaction = clickedReactionDesc;
        // needs to be like this for reactivity (no ++ or -- I think)
        reactions[swapFrom] = reactions[swapFrom] - 1;
        reactions[reaction] = reactions[reaction] + 1;
      } else {
        // log error idk
        console.log('uh oh idk reaction error of some kind');
      }
    }

    // might help w/reactivity
    localReaction = localReaction;
    localStorage.setItem(`${slug}-reaction`, localReaction);

    if (action && reaction && slug && isPostSlug(slug)) {
      const headers = {
        action: action,
        reaction: reaction,
        slug: slug,
        'swap-from': swapFrom,
      };
      console.log(headers);
      makeReactionRequest(action, slug, reaction, swapFrom);
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
    <span aria-hidden="true"
      ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M12 12Zm0 10q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q1.075 0 2.075.213T16 2.825v2.25q-.875-.5-1.888-.788T12 4Q8.675 4 6.337 6.337T4 12q0 3.325 2.337 5.663T12 20q3.325 0 5.663-2.337T20 12q0-.8-.163-1.55T19.4 9h2.15q.225.725.338 1.463T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm8-17h-1q-.425 0-.713-.288T18 4q0-.425.288-.713T19 3h1V2q0-.425.288-.713T21 1q.425 0 .713.288T22 2v1h1q.425 0 .713.288T24 4q0 .425-.288.713T23 5h-1v1q0 .425-.288.713T21 7q-.425 0-.713-.288T20 6V5Zm-4.5 6q.625 0 1.063-.438T17 9.5q0-.625-.438-1.063T15.5 8q-.625 0-1.063.438T14 9.5q0 .625.438 1.063T15.5 11Zm-7 0q.625 0 1.063-.438T10 9.5q0-.625-.438-1.063T8.5 8q-.625 0-1.063.438T7 9.5q0 .625.438 1.063T8.5 11Zm3.5 6.5q1.45 0 2.675-.7t1.975-1.9q.15-.3-.025-.6T16.1 14H7.9q-.35 0-.525.3t-.025.6q.75 1.2 1.988 1.9t2.662.7Z" /></svg
      ></span>
  </button>
  <ul class="menu-items" id="menu-items" popover anchor="menu-toggle">
    {#each ReactionsList as r, i}
      <li
        class="item"
        style={`--item-num: ${i + 1}; ${delayOverride}`}
        id={r.description}
        data-reaction-count={reactions?.[r.description] >= 0
          ? reactions[r.description]
          : 0}>
        <button
          class="reaction-input"
          id={r.description}
          aria-pressed={r.description === localReaction ? 'true' : 'false'}
          aria-label={r.description === localReaction
            ? `remove ${r.description} reaction`
            : localReaction
            ? `swap ${localReaction} to ${r.description}`
            : `add ${r.description} reaction`}
          title={r.description === localReaction
            ? `remove ${r.description} reaction`
            : localReaction
            ? `swap ${localReaction} to ${r.description}`
            : `add ${r.description} reaction`}
          on:click={(event) => {
            onReactionClick(r.description, event);
          }}>
          <span class="reaction-emoji" aria-hidden="true">{r.emoji}</span>
          <span class="sr-only">{r.description}</span>
        </button>
      </li>
    {/each}
    <!--  Need extra close button bc the popover lays on top of the X and doesn't let you get to it    -->
    <li class="item has-hidden-close">
      <button
        popovertargetaction="hide"
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
    --toggle-bg: var(--tertiary);
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
      user-select: none;
      vertical-align: middle;
    }

    & svg {
      display: inline-flex;
      width: 100%;
      padding: 0;
      margin: 0;
      aspect-ratio: 1;
      vertical-align: middle;
    }

    /* & .reaction-emoji {
      width: 100%;
      height: 100%;
    } */

    & :is(button, input) {
      border: none;
      margin: 0;
      appearance: none;
      background: none;
      font-size: 1.25rem;

      &:focus-visible {
        border: none;
        border-radius: 50%;
        aspect-ratio: 1/1;
        outline: none;
      }
    }

    /* Where the magic happens */
    & .item {
      --angle: calc(var(--_base-angle) * (var(--item-num) - 1));
      --delay: calc((var(--item-num) - 1) * var(--_delay-offset));
      --radius: calc(var(--btn-size) + var(--extra-space));
      --bg: var(--accent);
      --selected-bg: skyblue;
      --focus: deeppink;
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

      /* why does all work but not specific properties?? */
      transition-property: all;
      transition-timing-function: ease;
      user-select: none;

      &:has(:checked, [aria-pressed='true']) {
        --bg: var(--selected-bg);
      }

      &:is(:focus-visible, :focus-within) {
        outline: clamp(2px, 0.4ch, 5px) dashed var(--focus);
      }

      &:hover {
        /* outline: clamp(2px, .4ch, 5px) dashed color-mix(in oklch, var(--focus) 60%, white 0%); */
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

    & .item:has(.reaction-emoji):is(:hover, :focus, :focus-within)::after {
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
      --wiggle-init: 0deg;
      --wiggle: 60deg;
      z-index: 1;
      width: var(--btn-size);
      border-radius: 50%;
      aspect-ratio: 1;
      background-color: var(--toggle-bg);
      transition: background-color 300ms;
    }

    & .hidden-close {
      width: var(--btn-size);
      aspect-ratio: 1;
      background: none;
      transform: rotate(45deg);
      transition: opacity 100s;
      transition-delay: 1s;
    }
  }

  .menu-toggle > span {
    display: inline-block;
    transition: transform 300ms;
  }

  /* button effects when menu open */
  .radial-menu:has(:popover-open) .menu-toggle {
    /* transform: rotate(45deg); */

    /* animation: var(--click-anim); */
    background-color: color-mix(
      in oklch,
      var(--toggle-bg),
      var(--decrease-contrast) 20%
    );
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

  /* fallback styles if popover/anchor aren't supported */

  :global(:root:is(.no-anchor, .no-popover) .radial-menu) {
    display: flex;
    inline-size: auto;
    block-size: auto;

    /* has-hidden-close is needed for when :has isn't supported cough firefox cough */
    & :is(#menu-toggle, .item:is(:has(.hidden-close), .has-hidden-close)) {
      display: none;
    }

    & .menu-items {
      position: unset;
      display: flex;
      inline-size: fit-content(25ch);
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--space-s);
      inset: auto;
      translate: 0 !important;
    }

    & .item {
      opacity: 1;
      rotate: 0deg !important;
      transform: none !important;
      transition: none !important;
    }
  }
</style>
