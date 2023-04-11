import { expect, test } from '@playwright/test';

test.describe('can you do the most basic stuff in the app?', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can persist a new item', async ({ page }) => {
		await page.getByTestId('new-item-name').type('testing 123', { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();

		await expect(page.getByTestId('mini-card-0')).toBeVisible();
	});
});
