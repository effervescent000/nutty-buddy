import { expect, test } from '@playwright/test';

test.describe('tests re: logging in', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('can login and receive a cookie', async ({ page }) => {
		await page.getByTestId('login-input').type('testing 123');
		await page.getByTestId('login-submit').click();
		await page.waitForTimeout(500);
		expect((await page.context().cookies())[0]).toHaveProperty(
			'name',
			'userId'
		);
	});
});
