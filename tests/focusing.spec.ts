import { expect, test } from '@playwright/test';

test.describe('tests re: focusing', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can focus items', async ({ page }) => {
		// first we have to create a fake item. eventually replace this with inserting localStorage.
		await page.getByTestId('new-item-name').type('testing 123', { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();

		// eventually we will click on this and assert on the page after
		await expect(
			page.getByTestId('mini-card-0').getByTestId('focus-item')
		).toBeVisible();
	});
});
