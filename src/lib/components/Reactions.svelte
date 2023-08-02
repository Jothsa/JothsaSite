<script lang="ts">
  /* @link https://una.im/radial-menu/
   */

  import { ReactionsList } from '$scripts/Reactions';
  let delayOverride = '';
  // * delay it should be on open/close
  const openDelay =
    '--delay: calc((var(--item-num) - 1) * var(--_delay-offset));';
  const closeDelay =
    ' --delay: calc((var(--total-items) - (var(--item-num))) * var(--_delay-offset));';
  // this should be the total time the transition takes (alliteration lol) in ms
  const totalTransitionTime = ReactionsList.length * 75;

  // the callbacks are not required but will help if the menu is closed by clicking away, not on the button
  function onOpenClick() {
    // in case the button is clicked mid-transition
    delayOverride = openDelay;
    setTimeout(() => {
      delayOverride = closeDelay;
    }, totalTransitionTime);
  }

  function onCloseClick() {
    delayOverride = closeDelay;
    setTimeout(() => {
      delayOverride = openDelay;
    }, totalTransitionTime);
  }

  // TODO Add easings to CSS transitions
</script>

<div
  class="radial-menu"
  style={`--total-items: ${ReactionsList.length}; ${delayOverride}`}>
  <button
    class="menu-toggle"
    id="menu-toggle"
    popovertarget="menu-items"
    aria-label="open menu"
    title="open menu"
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
      <li class="item" style={`--item-num: ${i + 1}; ${delayOverride}`}>
        <button role="menuitem">
          <span
            class="reaction-emoji"
            aria-hidden="true"
            title={r.description}
            aria-label={r.description}>{r.emoji}</span>
        </button>
      </li>
    {/each}
    <!--  Need extra close button bc the popover lays on top of the X and doesn't let you get to it    -->
    <li class="item">
      <button
        popovertargetaction="close"
        popovertarget="menu-items"
        class="hidden-close"
        aria-label="close-menu"
        title="close-menu"
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

    & button {
      border: none;
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
      width: var(--btn-size);
      border-radius: 50%;
      aspect-ratio: 1;
      background-color: var(--bg);
      opacity: 0;
      transform: translateX(calc(cos(var(--angle)) * var(--radius)))
        translateY(calc(sin(var(--angle) * -1) * var(--radius))) rotate(0deg);
      transition: all 0.3s var(--delay) ease;
      user-select: none;

      &:has(.hidden-close) {
        background: none;
      }
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

  .radial-menu:has(:popover-open) .menu-toggle > span {
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

  /* Not related to demmo, just styling */

  /* Grid piles */

  .radial-menu,
  .menu-items,
  .item {
    display: grid;
    place-content: center;
  }

  .radial-menu > *,
  .menu-items > *,
  body > * .item button {
    grid-area: 1/1;
  }

  /* Resets, etc. */

  /* visually-hidden ala https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
  .sr-only {
    position: absolute;
    overflow: hidden;
    width: 1px;
    height: 1px;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .radial-menu,
  .menu-items {
    overflow: unset;
  }
</style>
