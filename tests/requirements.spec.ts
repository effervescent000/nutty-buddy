import { expect, test } from '@playwright/test';

test.describe('tests re: requirements', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/requirements');
		await page.getByTestId('login-input').type('itemInputTestUser');
		await page.getByTestId('login-submit').click();
	});

	test('can persist a requirement', async ({ page }) => {
		const newReq = `req ${Math.round(Math.random() * 100_000)}`;
		await page.getByTestId('req-name').type(newReq);
		await page.getByTestId('req-submit').click();

		await expect(page.locator('span', { hasText: newReq })).toBeVisible();
	});
});
