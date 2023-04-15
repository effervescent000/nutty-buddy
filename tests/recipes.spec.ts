import { expect, test } from '@playwright/test';

test.describe('tests re: recipes', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/recipes');
		await page.getByTestId('login-input').type('test user');
		await page.getByTestId('login-submit').click();
	});

	test('can persist a recipe', async ({ page }) => {
		const existingRecipes = (
			await page.getByText('Recipe for 1 a test item').all()
		).length;

		await page.getByTestId(`component-select-0`).selectOption('a test item');
		await page.getByTestId(`component-qty-0`).type('1');
		await page.getByTestId('method').selectOption('test method');
		await page.getByTestId('requirement-0').selectOption('test req');
		await page.getByTestId(`output-select-0`).selectOption('a test item');
		await page.getByTestId(`output-qty-0`).type('1');
		await page.getByTestId('submit').click();

		expect(
			(await page.getByText('Recipe for 1 a test item').all()).length
		).toBeGreaterThan(existingRecipes);
	});

	test('can update a recipe', async ({ page }) => {
		// const existingRecipes = (
		// 	await page.getByText('Recipe for 2 second item').all()
		// ).length;

		await page.getByTestId('recipe-card-1').locator('a').click();
		await page.waitForURL('**/recipes/1');
		await expect(page.getByTestId(`component-select-0`)).toHaveValue('0');
		await expect(page.getByTestId(`component-qty-0`)).toHaveValue('1');

		// expect(
		// 	(await page.getByText('Recipe for 2 second item').all()).length
		// ).toBeGreaterThan(existingRecipes);
	});
});
