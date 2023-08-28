<script lang="ts">
  import Img from '@zerodevx/svelte-img';
  import { onMount } from 'svelte';
  import type * as CSS from 'csstype';
  interface AccordionPanel {
    panelSrc: string;
    alt: string;
    title: string;
    text: string;
    /* not sure about icon */
    themeColor?: string;
    themeContrastColor?: string;
    titleBG?: CSS.Property.Background;
    style?: string;
    // controls placement of the body text
    // textPlacement?: CSS.Property.PlaceSelf;
    // used if the text on image needs to be adjusted
    // seems pretty hacky maybe don't do this
    // textColorL?: string;
    // textColorD?: string;
  }

  export let panels: AccordionPanel[];
  export let orientation: 'block' | 'inline' | 'responsive' = 'inline';
  export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;
  export let textPlacement: 'start' | 'center' | 'end' = 'center';
  // controls whether title disappears when panel selected in block orientation
  export let titleDisappearBlock = false;
  // controls the placement of content text when the accordion is in the inline orientation
  export let contentPlacementInline: CSS.Property.PlaceSelf | null = null;
  export let blockSize: CSS.Property.BlockSize | null = null;
  export let inlineSize: CSS.Property.InlineSize | null = null;
  export let panelExpandedSize:
    | CSS.Property.InlineSize
    | CSS.Property.BlockSize
    | null = null;
  export let panelCollapsedSize:
    | CSS.Property.InlineSize
    | CSS.Property.BlockSize
    | null = null;
  export let allowOverflow = true;
  export let containerAspectRatio: CSS.Property.AspectRatio | null = null;
  export let style = '';
  // how to load images
  export let loading: 'eager' | 'lazy' = 'lazy';

  const headingTag = `h${headingLevel}`;

  let accordionStyle = '';
  if (blockSize) {
    accordionStyle = `${accordionStyle} --block-size: ${blockSize};`;
  }
  if (inlineSize) {
    accordionStyle = `${accordionStyle} --inline-size: ${inlineSize};`;
  }
  if (contentPlacementInline) {
    accordionStyle = `${accordionStyle} --content-placement-inline: ${contentPlacementInline};`;
  }

  if (panelExpandedSize) {
    accordionStyle = `${accordionStyle} --panel-expanded-size: ${panelExpandedSize};`;
  }
  if (panelCollapsedSize) {
    accordionStyle = `${accordionStyle} --panel-collapsed-size: ${panelCollapsedSize};`;
  }
  if (containerAspectRatio) {
    accordionStyle = `${accordionStyle} aspect-ratio: ${containerAspectRatio};`;
  }

  onMount(() => {
    const accordion = document.querySelector('.accordion');
    // set first panel expanded
    const firstPanel = accordion?.querySelector(
      `.panel:first-of-type`,
    ) as HTMLDivElement | null;
    const supportsHas = window.CSS.supports('selector(:has(p))');
    if (!supportsHas) {
      console.log('this browser does not support :has');
    }
    // have to set this here (it won't be removed if I use {i===0})
    // not ideal if loading directly from url, but preloading seems to take care of it generally
    // haven't tested in prod tho
    if (firstPanel) toggleAccordion(firstPanel);
    if (accordion) {
      accordion.addEventListener('click', (e: Event) => {
        const activePanel = (e.target as HTMLElement).closest(
          '.panel',
        ) as HTMLDivElement | null;
        if (!activePanel) return;
        toggleAccordion(activePanel);
      });
    }

    function toggleAccordion(panelToActivate: HTMLDivElement) {
      // grabbing the panelButton here so I can check if it's expanded and don't have to rerun the querySelector later
      const panelButton: HTMLButtonElement | null =
        panelToActivate.querySelector('button');
      if (panelButton === null) {
        return;
      }
      // even if we're using not using :has, the aria-expanded still gets toggled
      if (panelButton.getAttribute('aria-expanded') === 'true') return;
      const panelToActivateParent: HTMLDivElement | null =
        panelToActivate.parentElement as HTMLDivElement | null;
      if (panelToActivateParent === null) return;
      const panelToActivateContents: HTMLDivElement | null =
        panelToActivate.querySelector(
          '.panel-content',
        ) as HTMLDivElement | null;
      if (panelToActivateContents === null) return;
      const buttons: NodeListOf<HTMLButtonElement> =
        panelToActivateParent.querySelectorAll('button');
      const contents: NodeListOf<HTMLDivElement> =
        panelToActivateParent.querySelectorAll('.content');
      if (!supportsHas) {
        const panels = panelToActivateParent.querySelectorAll('.panel');
        panels.forEach((panel) => {
          panel.classList.remove('expanded');
        });
        panelToActivate.classList.add('expanded');
      }
      buttons.forEach((button) => {
        button.setAttribute('aria-expanded', 'false');
        
      });
      contents.forEach((content) => {
        content.setAttribute('aria-hidden', 'true');
      });

      panelButton.setAttribute('aria-expanded', 'true');
      panelToActivateContents.setAttribute('aria-hidden', 'false');
    }
  });
</script>

<div
  class={`accordion-container`}
  class:allow-overflow={allowOverflow}
  style={`${accordionStyle} ${style}`}>
  <div
    class={`accordion ${orientation} text-${textPlacement}`}
    class:title-disappear-block={titleDisappearBlock}
    style={`${accordionStyle} ${style}`}>
    {#each panels as panel, i}
      <div class={`panel`} style={panel.style}>
        <svelte:element
          this={headingTag}
          id={`panel${i + 1}-heading`}
          class="panel-heading">
          <button
            class="panel-trigger"
            aria-controls={`panel${i + 1}-content`}
            aria-expanded="false">
            <span class="panel-title" id={`panel${i + 1}-title`}>
              {panel.title}
            </span>
          </button>
        </svelte:element>
        <div
          class="panel-content"
          id={`panel${i + 1}-content`}
          aria-labelledby={`panel${i + 1}-heading`}
          aria-hidden={`true`}
          role="region">
          <p>{panel.text}</p>
          <Img
            class="panel-image"
            src={panel.panelSrc}
            alt={panel.alt}
            {loading} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Accordion
  * credit to Kevin Powell 
  * ?-- = optional variable (might be given or omitted)
  *
  div .accordion .(inline | block | responsive) ?--block-size 
    div .panel .panel1 .expanded  ?--panel-color ?--text-placement 
      h(1-6) .panel-heading #panel1-heading
        button .panel-trigger [aria-expanded] [aria-controls="panel1-content"]
          span .panel-title
      div .panel-content #panel1-content [aria-labelledby="panel1-heading"] [role="region"] [aria-hidden]
        p
        img .panel-image
  */

  .accordion-container {
    /* TODO fix these stupid overflow/sizing issues */

    /* width: 85vw; */
    inline-size: var(--inline-size);
    block-size: var(--block-size);
    contain: content;
    container: accordion / inline-size;
    overflow-x: scroll;
  }

  .accordion {
    /* [1] padding prevents issue with outlines
     * [2] block size should be fixed to prevent weirdness when in inline direction
     *  could 100% as long as container has a fixed block size 
     * [3] media/container query breakpoint */
    --block-size: 40rem; /* [2] */
    --breakpoint: 45em; /* [3] */
    --button-size: 3rem; /* TODO remove fix w/e it breaks if removed */
    --panel-padding: 0.75rem;
    --panel-collapsed-size: calc(
      (var(--panel-padding) * 2) + var(--button-size)
    );
    --panel-expanded-size: 20vw;
    --panel-gap: 1rem;
    --panel-focus: var(--contrast);
    --title-placement: center center;
    --content-placement: end center;
    --content-placement-inline: end center;
    --transition-time: 500ms;
    --transition-offset: 250ms;
    --panel-heading-font: system-ui;

    display: flex;

    /* max-width: 100%; */
    padding: 0.5rem; /* [1] */
    gap: var(--panel-gap);

    & * {
      margin: 0;
    }

    &.text-start {
      --title-placement: center start;
      --content-placement: end start;
      --content-placement-inline: end start;
    }

    &.text-center {
      --title-placement: center center;
      --content-placement: end center;
      --content-placement-inline: end center;
    }

    &.text-end {
      --title-placement: center end;
      --content-placement: end end;
      --content-placement-inline: end end;
    }
  }

  .panel {
    position: relative;
    display: grid;
    overflow: hidden;
    flex-basis: var(--panel-collapsed-size);
    padding: var(--panel-padding);

    /* padding-right: calc(var(--panel-padding) * 4); */
    border-radius: calc(var(--panel-collapsed-size) / 2);
    isolation: isolate;

    @media (prefers-reduced-motion: no-preference) {
      transition:
        flex-basis 500ms,
        flex-grow 500ms;
    }

    &:focus-within {
      outline: 3px solid var(--panel-focus);
      outline-offset: 4px;
    }
  }

  .panel-heading {
    grid-area: heading;
    opacity: 1;
    place-self: var(--title-placement);
    transform: translateX(0);

    @media (prefers-reduced-motion: no-preference) {
      transition:
        transform var(--transition-time),
        opacity var(--transition-time) var(--transition-offset);
    }
  }

  .panel-title {
    background: var(--title-bg, transparent);
    font-family: var(--panel-heading-font), system-ui;
  }

  .panel-content {
    grid-area: content;
    place-self: var(--content-placement);

    & > p {
      /* margin-left: calc(var(--button-size) + var(--panel-gap)); */
      opacity: 0;
      transform: translateY(2rem);
    }
  }

  /* need to use because the class prop of svelte-img only applies to the fallback img element not the picture element 
  make sure this works if img fallback is used */
  :global(
      .accordion .panel-content .panel-image,
      .accordion .panel-content picture
    ) {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    inset: 0;
    object-fit: cover;

    /* transition: filter 500ms; */
  }

  .panel-trigger {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0;
    border: 0;
    background: transparent;
    gap: var(--panel-gap);
    outline: 0;
  }

  /* Main Panel Expanded Styles
   * [1] The transition delay should the main transition time because it squishes the text if the panel isn't fully expanded
   */

  .panel:has([aria-expanded='true']) {
    flex-basis: var(--panel-expanded-size);
    flex-grow: 1;

    & p {
      opacity: 1;
      transform: translateY(0);

      @media (prefers-reduced-motion: no-preference) {
        transition:
          transform var(--transition-time) var(--transition-time),
          opacity var(--transition-time) var(--transition-time); /* [1] */
      }

      @media (prefers-reduced-motion) {
        transition: opacity var(--transition-time) var(--transition-time); /* [1] */
      }
    }
  }

  @supports not selector(:has(p)) {
    .panel.expanded {
      /* TODO Will add when styles finalized */
      flex-basis: var(--panel-expanded-size);
      flex-grow: 1;
    }
  }

  /* don't know wHy it has to be tHiS wAy
   * hEvEn fOrBiD wE fUlLy sUpPoRt mOdErN cSs iN tHe YeAr oF oUr LoRd tWo ThOuSaNd AnD tWeNtY tHrEe 
   */
  /* stylelint-disable-next-line no-descending-specificity */
  p {
    @supports not selector(:has(h1)) {
      opacity: 1;
      transform: translateY(0);

      @media (prefers-reduced-motion: no-preference) {
        transition:
          transform var(--transition-time) var(--transition-time),
          opacity var(--transition-time) var(--transition-time); /* [1] */
      }

      @media (prefers-reduced-motion) {
        transition: opacity var(--transition-time) var(--transition-time); /* [1] */
      }
    }
  }

  /* Inline/Side to Side Orientation Normal Styles */

  .accordion.inline {
    --content-placement: var(--content-placement-inline);
    block-size: var(--block-size);

    flex-direction: row;

    & .panel {
      grid-template: 'heading content';
      grid-template-columns: min-content 1fr;
      grid-template-rows: 1fr;
    }

    /* & .panel-heading {
      place-self: var(--text-placement);
    } */

    & .panel-title {
      text-orientation: mixed;
      writing-mode: vertical-rl;
    }
  }

  /* Block/Up and Down Orientation Normal Styles */

  .accordion.block {
    flex-direction: column;

    & .panel {
      grid-template: 'heading' 'content';
      grid-template-columns: 1fr;
      grid-template-rows: min-content 1fr;
    }

    & .panel-heading {
      --text-placement: center;
    }
  }

  /* Inline/Side to Side Orientation Expanded Styles */
  .accordion.inline .panel:has([aria-expanded='true']) {
    & .panel-heading {
      opacity: 0;
      transform: translateX(-3em);
    }
  }

  /* Block/Up and Down Orientation Expanded Styles */
  .accordion.block .panel:has([aria-expanded='true']) {
    /* & .panel-heading {
        opacity: 0;
        transform: translateX(-3em);
      } */
  }

  /* TODO test block overflow */
  .accordion-container.allow-overflow .inline .panel {
    min-inline-size: var(--panel-collapsed-size);
  }

  .accordion-container.allow-overflow .block .panel {
    min-block-size: var(--panel-collapsed-size);
  }

  /* shouldn't be needed and messes up animations/transition
  
  .accordion-container.allow-overflow
    .inline
    .panel:is(.expanded, :has([aria-expanded='true'])) {
    min-inline-size: var(--panel-expanded-size);
  }

  .accordion-container.allow-overflow
    .block
    .panel:is(.expanded, :has([aria-expanded='true'])) {
    min-block-size: var(--panel-expanded-size);
  } */
</style>
