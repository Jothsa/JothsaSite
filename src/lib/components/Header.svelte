<script lang="ts">
  import Navigation from './Navigation.svelte';
  import SupportsNotice from '$components/SupportsNotice.svelte';
  import PreferencesMenu from './PreferencesPopover.svelte';
  import SearchModal from './SearchModal.svelte';
</script>

<div class="header-container" data-pagefind-ignore>
  <header id="header">
    <span class="site-title h1">Jothsa's Site!</span>
    <div class="header-buttons-wrapper">
      <SearchModal buttonStyle="grid-area: preferences" />
      <div class="preference-menu-wrapper">
        <PreferencesMenu />
      </div>
    </div>
    <div class="navigation-wrapper">
      <Navigation />
    </div>
    <div class="supports-notice-wrapper">
      <SupportsNotice />
    </div>
  </header>
</div>

<style>
  .header-container {
    display: flex;
    inline-size: 100%;
    max-inline-size: 100svi;
    container: header / inline-size;
  }

  header {
    --_font: var(--header-font), 'Carter One', system-ui;

    display: grid;
    inline-size: 100%;
    justify-content: center;
    padding-block: var(--space-3xs);
    padding-inline: var(--space-xs);
    gap: var(--space-3xs);
    grid-template-areas:
      'title'
      'preferences'
      'navigation'
      'notice';
    view-transition-name: header;

    & .site-title {
      display: flex;
      justify-content: center;
      font-family: var(--_font);
      grid-area: title;
      justify-items: center;
    }

    & .header-buttons-wrapper {
      display: flex;
      flex-flow: row wrap;
      gap: var(--space-xs);
      grid-area: preferences;
      place-self: center end;
    }

    & .navigation-wrapper {
      grid-area: navigation;
    }

    & .supports-notice-wrapper {
      grid-area: notice;
    }

    @container header (inline-size > 20rem) {
      justify-content: unset;
      grid-template-areas:
        'title title preferences'
        'navigation navigation navigation'
        'notice notice notice';
      justify-items: unset;

      & .site-title {
        justify-content: unset;
      }
    }
  }

  :global(:root:is(.no-popover) .preference-menu-wrapper) {
    display: none;
  }
</style>
