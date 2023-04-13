import { expect, test } from '@playwright/test';

test.describe('tests re: focusing', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/items');
	});

	test.skip('can focus items', async ({ page }) => {
		// first we have to create a fake item. eventually replace this with inserting localStorage.
		await page.getByTestId('new-item-name').type('testing 123', { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();

		await page.getByTestId('mini-card-1').getByTestId('focus-item').click();
		await expect(page.getByTestId('new-item-name')).toHaveValue('testing 123');
	});

	test.skip('can manipulate focused items', async ({ page }) => {
		// first we have to create a fake item. eventually replace this with inserting localStorage.
		await page.getByTestId('new-item-name').type('testing 123', { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();
		await expect(page.getByTestId('new-item-name')).toHaveValue('');

		await page.getByTestId('mini-card-1').getByTestId('focus-item').click();
		await page.getByTestId('new-item-name').type('345', { delay: 50 });
		await page.getByTestId('new-item-save').click();

		await expect(page.getByTestId('mini-card-1')).toHaveText('345testing 123');
	});
});
