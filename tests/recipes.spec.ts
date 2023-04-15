import { expect, test } from '@playwright/test';

test.describe('tests re: recipes', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/recipes');
		await page.getByTestId('login-input').type('test user');
		await page.getByTestId('login-submit').click();
	});

	test('can persist a recipe', async ({ page }) => {
		await page.getByTestId(`component-select-${0}`).selectOption('a test item');
		await page.getByTestId(`component-qty-${0}`).type('1');
		await page.getByTestId('method').selectOption('test method');
		await page.getByTestId('requirement-0').selectOption('test req');
		await page.getByTestId(`output-select-${0}`).selectOption('a test item');
		await page.getByTestId(`output-qty-${0}`).type('1');
		await page.getByTestId('submit').click();

		await expect(page.getByText('Recipe for 1 a test item')).toBeVisible();
	});
});