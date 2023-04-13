import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			VITE_ROOT_URL: 'http://localhost:4173',
			DATABASE_URL: 'file:./dev.db'
		}
	},
	testDir: 'tests',
	use: {
		baseURL: 'http://localhost:4173'
	}
};

export default config;
