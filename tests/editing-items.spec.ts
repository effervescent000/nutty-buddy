import { expect, test } from '@playwright/test';

test.describe('tests re: focusing and editing items', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/items');
		await page.getByTestId('login-input').type('itemInputTestUser');
		await page.getByTestId('login-submit').click();
	});

	test('can focus an item', async ({ page }) => {
		//  first create a dummy item
		const newItemName = `item ${Math.round(Math.random() * 100_000)}`;
		await page.getByTestId('new-item-name').type(newItemName, { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();

		await page.getByTestId(`mini-card-${newItemName}`).locator('a').click();
		await page.waitForURL(/items\/\d+$/);
		await expect(page.getByTestId('edit-item-name')).toHaveValue(newItemName);
	});
});
