import { expect, test, type Page } from '@playwright/test';

// make sure each page has an element with an id of "content" and "footer" for the quick nav
test('every page has a #content element', async ({ page }) => {
  // should be ok to only tests the main pages
  const pageNames = [
    '/',
    '/blog',
    '/blog/ahsoka-eps-1-2',
    '/about',
    '/tags',
    '/tags/star-wars',
  ];
  pageNames.forEach(async (p) => {
    console.log(`testing ${p}`);
    await page.goto(p);
    await testPageNavLandmarks(page);
  });
});

async function testPageNavLandmarks(page: Page) {
  const landmarks = ['header', 'content', 'footer'];
  landmarks.forEach(async (l) => {
    await expect(page.locator(`#${l}`)).toBeVisible();
  });
}
