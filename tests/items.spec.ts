import { expect, test } from '@playwright/test';

test.describe('tests re: inputting items', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/items');
		await page.getByTestId('login-input').type('test user');
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

	test("can view an item's recipes", async ({ page }) => {
		await page.getByTestId(`mini-card-${'a test item'}`).locator('a').click();
		await page.waitForURL(/items\/\d+$/);
		await expect(page.getByText('Via test method')).toBeVisible();
		await page.getByText('Via test method').click();
		await expect(page.getByText('1 a test item')).toBeVisible();
		await page.getByTestId('qty-input').clear();
		await page.getByTestId('qty-input').type('2');
		await expect(page.getByText('2 a test item')).toBeVisible();
	});

	test('can focus and edit an item', async ({ page }) => {
		await page.getByTestId(`mini-card-${'a test item'}`).locator('a').click();
		await page.waitForURL(/items\/\d+$/);
		await expect(page.getByTestId('edit-item-name')).toHaveValue('a test item');
		await page.getByTestId('edit-item-name').clear();
		await page.getByTestId('edit-item-name').type('a more different item');
		await page.getByTestId('edit-item-save').click();
		await page.reload();
		await expect(page.getByTestId('edit-item-name')).toHaveValue(
			'a more different item'
		);
	});
});
