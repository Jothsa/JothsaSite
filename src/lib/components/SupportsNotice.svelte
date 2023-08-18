<script lang="ts">
  import * as SupportsCSS from 'supports-css';
  import { onMount } from 'svelte';

  const tests = [
    'anchor',
    'at-container',
    'at-property',
    'color-function',
    'color-mix',
    'container-units',
    'dynamic-viewport-units',
    'has',
    'logical-properties',
    'nesting',
    'nth-of-s',
    'view-transitions',
  ];

  const unsupportedTestClassNames: string[] = [];

  tests.forEach((t) => {
    unsupportedTestClassNames.push(`.no-${t}`);
  });
  // have to add my custom tests
  unsupportedTestClassNames.push(
    '.no-popover',
    '.no-animation-range',
    '.no-timeline-scope',
    '.no-web-share',
  );

  onMount(() => {
    // doesn't need to be added to test array
    SupportsCSS.addTest(
      'popover',
      HTMLElement.prototype.hasOwnProperty('popover'),
    );
    // used for view timeline animations
    SupportsCSS.addTest(
      'animation-range',
      CSS.supports('animation-range: exit-crossing 0% entry-crossing 100%'),
    );
    SupportsCSS.addTest(
      'timeline-scope',
      CSS.supports('timeline-scope: --post'),
    );
    // not CSS but w/e
    SupportsCSS.addTest(
      'web-share',
      window?.navigator?.share &&
        window?.navigator?.canShare({
          title: 'title',
          text: 'description',
          url: 'www.apple.com',
        }),
    );
    SupportsCSS.init({ tests });
    document
      .querySelector(
        `:root:is(${unsupportedTestClassNames.toString()}) #supports-menu`,
      )
      ?.classList.add('unsupported');
  });
</script>

<div class="support-menus-container">
  <noscript>
    <div id="no-js-menu">
      <p>Enable javascript for the best experience.</p>
    </div>
  </noscript>

  <details id="supports-menu" class="styled-links">
    <summary
      >Your browser doesn't support all of the features used on this site.</summary>
    <p>
      We live on the edge here. Because your browser doesn't support the
      modern/bleeding edge features used on this site, some elements may be
      hidden or non-functional. To get the best experience, upgrade your browser
      or, if you're feeling adventurous, enable some flags.
    </p>

    <figure>
      <figcaption class="">Unsupported features include:</figcaption>
      <ul>
        <noscript
          ><li id="no-script-li">
            Whoops, can't display without javascript.
          </li></noscript>
        <li id="popover">
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
            >The Popover API</a>
        </li>
        <li id="web-share">
          <p>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API"
              >Web Share API</a> Note: Chrome on MacOS does not support this feature at the time of writing, so there might be nothing you can do except switch to another browser. This feature is used minimally though, so it's not a big deal.
          </p>
        </li>
        <li id="anchor-pos">
          <a
            href="https://developer.chrome.com/blog/tether-elements-to-each-other-with-css-anchor-positioning/"
            >Anchor Positioning</a>
        </li>
        <li id="view-timeline">
          <a
            href="https://developer.chrome.com/articles/scroll-driven-animations/#view-progress-timeline"
            >View Timeline</a>
        </li>
        <li id="Animation Range">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range"
            >Animation-Range</a>
        </li>
        <li id="color-mix">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix"
            ><code>color-mix</code></a>
        </li>
        <li id="container">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries"
            >Container Queries</a>
        </li>
        <li id="at-property">
          <a href="https://web.dev/at-property/">@property</a>
        </li>
        <li id="nesting">
          <a href="https://developer.chrome.com/articles/css-nesting/"
            >CSS Nesting</a>
        </li>
        <li id="has">
          <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has"
            >:has</a>
        </li>
        <li id="dynamic-viewport-units">
          <a
            href="https://css-tricks.com/the-large-small-and-dynamic-viewports/"
            >Dynamic Viewport Units</a>
        </li>
        <li id="view-transitions">
          <a
            href="https://developer.chrome.com/docs/web-platform/view-transitions/"
            >View Transitions</a>
        </li>
        <li id="timeline-scope">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/timeline-scope"
            ><code>timeline-scope</code></a>
        </li>
        <li id="logical-properties">
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values"
            >Logical Properties</a>
        </li>
      </ul>
    </figure>
  </details>
</div>

<style>
  /* tbh I might be using too many modern features for a fallback menu but w/e */

  .support-menus-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
  }

  /* some cls in inevitable, but try to minimize w/@supports 
   * starting dialog closed helps as well */
  :where(#supports-menu) {
    display: none;
    padding-inline: var(--space-3xs);
    margin-block-end: var(--space-xs);

    & p {
      display: block;
    }
  }

  /* :global() prevents style from being removed for being unused */
  :global(#supports-menu.unsupported) {
    display: grid;
  }

  @supports not (
    (animation-range: exit-crossing 0% entry-crossing 100%) and
      (animation-timeline: var(--view-timeline-name)) and
      (view-timeline: --post block) and (width: 1dvi) and
      (border-start-start-radius: 1px) and (left: anchor(center)) and
      selector(:has(+ *)) and selector(& a) and
      (background-color: color-mix(in srgb, #34c9eb 50%, white))
  ) {
    #supports-menu {
      display: grid;
    }
  }

  #no-js-menu,
  #supports-menu {
    block-size: fit-content;
    justify-content: center;
    border-block: dashed var(--space-3xs) var(--contrast);
    background: var(--tertiary);
    color: var(--text-primary);
  }

  #no-js-menu {
    display: flex;
  }

  /* should prob only display ul if an li is visible 
   * (some unsupported features could not be listed, but I could just make sure to add all tested features to the list)
   */
  :where(#supports-menu ul, #supports-menu li) {
    padding: 0;
    margin: 0;
  }

  @counter-style unsupported-list {
    suffix: ' ';
    symbols: 🤖 👾 💾;
    system: cyclic;
  }

  :where(#supports-menu ul) {
    list-style: unsupported-list;
  }

  #supports-menu li {
    margin-inline-start: 2ch;
  }

  :where(#supports-menu ul li:not(#no-script-li)) {
    display: none;
  }

  :global(
      :root.no-popover #popover,
      :root.no-web-share #web-share,
      :root.no-view-timeline #view-timeline,
      :root.no-animation-range #animation-range,
      :root.no-anchor #anchor-pos,
      :root.no-container #container,
      :root.no-at-property #at-property,
      :root.no-nesting #nesting,
      :root.no-has #has,
      :root.no-dynamic-viewport-units #dynamic-viewport-units,
      :root.no-view-transitions #view-transitions,
      :root.no-logical-properties #logical-properties
    ) {
    display: list-item;
  }
</style>
