import { expect, test } from '@playwright/test';

test.describe('tests re: inputting items', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/items');
	});

	test.skip('can persist a new item', async ({ page }) => {
		await page.getByTestId('new-item-name').type('testing 123', { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();
		// clicking the save button should also clear out the item values
		await expect(page.getByTestId('new-item-name')).toHaveValue('');
		await expect(page.getByTestId('new-item-mod')).toHaveValue('');
		await expect(page.getByTestId('auto-complete-popout')).not.toBeVisible();

		await expect(page.getByTestId('mini-card-1')).toBeVisible();
	});
});
