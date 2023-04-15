import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command:
			'npx prisma db push && npx prisma db seed && npm run build && npm run preview',
		port: 4173,
		env: {
			VITE_ROOT_URL: 'http://localhost:4173',
			DATABASE_URL: 'file:./test.db'
		}
	},
	testDir: 'tests',
	use: {
		baseURL: 'http://localhost:4173'
	}
};

export default config;
