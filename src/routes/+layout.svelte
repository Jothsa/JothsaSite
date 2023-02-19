<script>
  import {
    SvelteUIProvider,
    AppShell,
    Navbar,
    Header,
    Aside,
    Footer,
    ShellSection,
  } from '@svelteuidev/core';
  // import HeadContent from './header.svelte';
  // import NavContent from './navbar.svelte';

  // let isDark = false;
  // let opened = false;

  // function toggleTheme() {
  //   isDark = !isDark;
  // }
  // function toggleOpened() {
  //   opened = !opened;
  // }
</script>

<!-- <AppShell fixed navbarOffsetBreakpoint="sm" asideOffsetBreakpoint="sm">
  <Navbar slot="navbar" hidden={!opened} fixed>
    <NavbarContent />
  </Navbar>

  <Header fixed slot="header">
    <HeaderContent />
  </Header> -->

<!-- Main content uses the default slot, so no need to explicitly declare it -->
<!-- <ShellSection grow>
    <MainContent />
  </ShellSection>

  <Aside slot="aside">
    <AsideContent />
  </Aside>

  <Footer slot="footer">
    <FooterContent />
  </Footer>
</AppShell> -->

<SvelteUIProvider>
  <slot />
</SvelteUIProvider>
