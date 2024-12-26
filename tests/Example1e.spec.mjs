import { test, expect } from '@playwright/test';
test('Example1e', async ({ page }) => {
    await page.goto('./tests/Example1e.html');
    // wait for 1 second
    await page.waitForTimeout(3000);
    const editor = page.locator('#target');
    await expect(editor).toHaveAttribute('mark', 'good');
});
