import { test } from '@playwright/test';

test.describe('tests re: methods', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/methods');
	});

	test('can persist a method', async ({ page }) => {
		const newMethod = `method-${Math.round(Math.random() * 100_000)}`;
		await page.getByTestId('new-method-name').type(newMethod);
		await page.getByTestId('method-submit').click();
	});
});
