<script lang="ts">
  /* @link https://una.im/radial-menu/
   * card needs position relative
   */

  //  import {onMount} from 'svelte';
  // import {isSupported, apply}  from '@oddbird/popover-polyfill/dist/popover-fn';
  // import '@oddbird/popover-polyfill/dist/popover.css';
  // import '@oddbird/css-anchor-positioning/dist/'
  // onMount(() => {
  // import '@oddbird/css-anchor-positioning';
  // if (!isSupported) {
  //   apply();
  // }
  // });
</script>

<div class="menu">
  <button class="menu-toggle" id="menu-toggle" popovertarget="menu-items">
    <span aria-hidden="true">➕</span>
    <span class="sr-only">menu trigger</span>
  </button>
  <ul
    class="menu-items"
    id="menu-items"
    popover
    anchor="menu-toggle"
    role="menu">
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">😍</span>
        <span class="sr-only">love</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">😁</span>
        <span class="sr-only">smile</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">😂</span>
        <span class="sr-only">funny</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">🤯</span>
        <span class="sr-only">mind blown</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">🥳</span>
        <span class="sr-only">celebrate</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">🤨</span>
        <span class="sr-only">skeptical</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">🙁</span>
        <span class="sr-only">disappointed</span>
      </button>
    </li>
    <li class="item">
      <button role="menuitem">
        <span aria-hidden="true">😠</span>
        <span class="sr-only">upset</span>
      </button>
    </li>
    <!--  Need extra close button bc the popover lays on top of the X and doesn't let you get to it    -->
    <li class="item">
      <button
        popovertargetaction="close"
        popovertarget="menu-items"
        class="hidden-close">
        <span aria-hidden="true"> </span>
        <span class="sr-only">close menu</span>
      </button>
    </li>
  </ul>
</div>

<style>
  .menu {
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
    --num-items: 8;
    --full-rotation: 360deg; /* [1] */
    --delay-offset: 75ms; /* [2] */
    --max-opening-time: 1.2s; /* [3] */
    --_base-angle: calc(var(--full-rotation) / var(--num-items));
    --_delay-offset: min(
      var(--delay-offset, 999s),
      (var(--max-opening-time) / (var(--num-items) - 1))
    ); /* [4] */
  }

  :global(html:is(.no-anchor, .no-popover)) .menu {
    display: none;
  }

  /* Where the magic happens */
  .item {
    --radius: calc(var(--btn-size) + var(--extra-space));
    background-color: var(--bg);
    opacity: 0;
    transform: translateX(calc(cos(var(--angle)) * var(--radius)))
      translateY(calc(sin(var(--angle) * -1) * var(--radius))) rotate(0deg);
    transition: all 0.3s var(--delay) ease;
  }

  /* Adding for popover base */

  .menu-items:not(:popover-open, .\:popover-open) .item {
    --radius: 0;
    --angle: 0;
    rotate: 45deg;
  }

  /* rotate the "plus" */
  .menu-toggle > span {
    display: inline-block;
    transition: transform 0.3s;
  }

  .menu:has(:popover-open, .\:popover-open) .menu-toggle > span {
    transform: rotate(45deg);
  }

  .menu-items {
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

  :is(:popover-open, .\:popover-open) .item {
    opacity: 1;
  }

  /* Every item gets a background, angle, and delay */

  /* This gets updated when the popover is open */

  .item:nth-child(1) {
    --item-num: 1;
    --bg: pink;
  }

  .item:nth-child(2) {
    --item-num: 2;
    --bg: thistle;
  }

  .item:nth-child(3) {
    --item-num: 3;
    --bg: paleturquoise;
  }

  .item:nth-child(4) {
    --item-num: 4;
    --bg: lightgreen;
  }

  .item:nth-child(5) {
    --item-num: 5;
    --bg: peachpuff;
  }

  .item:nth-child(6) {
    --item-num: 6;
    --bg: skyblue;
  }

  .item:nth-child(7) {
    --item-num: 7;
    --bg: aliceblue;
  }

  .item:nth-child(8) {
    --item-num: 8;
    --bg: fuchsia;
  }

  /* Not related to demo, just styling */

  .item {
    --angle: calc(var(--_base-angle) * (var(--item-num) - 1));
    --delay: calc((var(--item-num) - 1) * var(--_delay-offset));
    width: var(--btn-size);
    border-radius: 50%;
    aspect-ratio: 1;
  }

  .menu-toggle {
    z-index: 1;
    width: var(--btn-size);
    border-radius: 50%;
    aspect-ratio: 1;
    background: darksalmon;
  }

  /* Grid piles */

  .menu,
  .menu-items,
  body,
  .item {
    display: grid;
    place-content: center;
  }

  .menu > *,
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

  button {
    border: none;
    background: none;
    color: #222;
    font-family: 'Noto Emoji';
    font-size: 1.25rem;
  }

  button:focus-visible {
    border-radius: 50%;
    aspect-ratio: 1/1;
    outline: 2px dashed deeppink;
  }

  body {
    height: 100vh;
  }

  .menu,
  .menu-items {
    overflow: unset;
  }
</style>
