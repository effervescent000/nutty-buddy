import { expect, test } from '@playwright/test';

test.describe('tests re: inputting items', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/items');
		await page.getByTestId('login-input').type('itemInputTestUser');
		await page.getByTestId('login-submit').click();
	});

	test('can persist a new item', async ({ page }) => {
		const newItemName = `item ${Math.round(Math.random() * 100_000)}`;
		await page.getByTestId('new-item-name').type(newItemName, { delay: 50 });
		await page.getByTestId('new-item-type').selectOption('item');
		await page.getByTestId('new-item-mod').type('testing 456', { delay: 50 });
		await page.getByTestId('new-item-save').click();
		await expect(page.getByTestId('new-item-name')).toHaveValue('');
		await expect(page.getByTestId('new-item-mod')).toHaveValue('');
		await expect(page.getByTestId('auto-complete-popout')).not.toBeVisible();

		await expect(page.getByTestId(`mini-card-${newItemName}`)).toBeVisible();
	});
});
