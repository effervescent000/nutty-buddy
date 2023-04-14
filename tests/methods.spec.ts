import { expect, test } from '@playwright/test';

test.describe('tests re: methods', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/methods');
		await page.getByTestId('login-input').type('itemInputTestUser');
		await page.getByTestId('login-submit').click();
	});

	test('can persist a method', async ({ page }) => {
		const newMethod = `method-${Math.round(Math.random() * 100_000)}`;
		await page.getByTestId('new-method-name').type(newMethod);
		await page.getByTestId('method-submit').click();
		await expect(page.getByTestId(`method-card-${newMethod}`)).toBeVisible();
	});
});
