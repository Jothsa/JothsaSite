<script lang="ts">
  /* @link https://una.im/radial-menu/
   * card needs position relative (?)
   */

  import { ReactionsList } from '$scripts/Reactions';
  import ReactionEmojiListItems from './ReactionEmojiListItems.svelte';
</script>

<div class="reactions-menu" style={`--num-items: ${ReactionsList.length}`}>
  <button class="reaction-menu-toggle" id="reaction-menu-toggle" popovertarget="reaction-menu-items">
    <span aria-hidden="true">➕</span>
    <span class="sr-only">menu trigger</span>
  </button>
  <ul
    class="reaction-menu-items"
    id="reaction-items"
    popover
    anchor="reaction-menu-toggle"
    role="menu">
    {#each ReactionsList as r, i}
      <li class="reaction-menu-item" style={`--item-num: ${i + 1}`}>
        <button class="reaction-button" role="menuitem">
          <span class="reaction-emoji" aria-hidden="true" title={r.description} aria-label={r.description}
            >{r.emoji}</span>
        </button>
      </li>
    {/each}
    <!--  Need extra close button bc the popover lays on top of the X and doesn't let you get to it    -->
    <li class="reaction-menu-item">
      <button
        popovertargetaction="close"
        popovertarget="reaction-menu-items"
        class="hidden-close" aria-label="close menu">
        <span aria-hidden="true"> </span>
      </button>
    </li>
  </ul>
</div>

<style>
  .reactions-menu {
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
    --_base-angle: calc(var(--full-rotation) / var(--num-items));
    --_delay-offset: min(
      var(--delay-offset, 999s),
      (var(--max-opening-time) / (var(--num-items) - 1))
    ); /* [4] */
  }

  :global(html:is(.no-anchor, .no-popover)) .reactions-menu {
    display: none;
  }

  /* Where the magic happens */
  .reaction-menu-item {
    --radius: calc(var(--btn-size) + var(--extra-space));
    background-color: var(--bg);
    opacity: 0;
    transform: translateX(calc(cos(var(--angle)) * var(--radius)))
      translateY(calc(sin(var(--angle) * -1) * var(--radius))) rotate(0deg);
    transition: all 0.3s var(--delay) ease;
  }

  /* Adding for popover base */

  .reaction-menu-items:not(:popover-open) .reaction-menu-item {
    --radius: 0;
    --angle: 0;
    rotate: 45deg;
  }

  /* rotate the "plus" */
  .reaction-menu-toggle > span {
    display: inline-block;
    transition: transform 0.3s;
  }

  .reactions-menu:has(:popover-open) .reaction-menu-toggle > span {
    transform: rotate(45deg);
  }

  .reaction-menu-items {
    bottom: calc(anchor(bottom));
    left: anchor(center);

    /*  popover override  */
    background: none;
    translate: -50% 0;
  }

  .hidden-close {
    width: var(--btn-size);
    aspect-ratio: 1;
    transform: rotate(45deg);
    transition: opacity 0.1s;
    transition-delay: 1s;
  }

  :popover-open .reaction-menu-item {
    opacity: 1;
  }

  /* Every item gets a background, angle, and delay */

  /* This gets updated when the popover is open */

  .reaction:nth-child(1) {
    --bg: pink;
  }

  .reaction:nth-child(2) {
    --bg: thistle;
  }

  .reaction:nth-child(3) {
    --bg: paleturquoise;
  }

  .reaction:nth-child(4) {
    --bg: lightgreen;
  }

  .reaction:nth-child(5) {
    --bg: peachpuff;
  }

  .reaction:nth-child(6) {
    --bg: skyblue;
  }

  .reaction:nth-child(7) {
    --bg: aliceblue;
  }

  .reaction:nth-child(8) {
    --bg: fuchsia;
  }

  /* Not related to demo, just styling */

  .reaction-menu-item {
    --angle: calc(var(--_base-angle) * (var(--item-num) - 1));
    --delay: calc((var(--item-num) - 1) * var(--_delay-offset));
    width: var(--btn-size);
    border-radius: 50%;
    aspect-ratio: 1;
  }

  .reaction-menu-toggle {
    z-index: 1;
    width: var(--btn-size);
    border-radius: 50%;
    aspect-ratio: 1;
    background: darksalmon;
  }

  /* Grid piles */

  .reactions-menu,
  .reaction-menu-items,
  .reaction-menu-item {
    display: grid;
    place-content: center;
    align-items: center;
  }

  .reactions-menu > *,
  .reaction-menu-items > * {
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

  button {
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

  .reactions-menu,
  .reaction-menu-items {
    overflow: unset;
  }
</style>
