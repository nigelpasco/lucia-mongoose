import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	ssr: {
		noExternal: ["@lucia-auth/sveltekit"]
	},
	plugins: [sveltekit()]
};

export default config;
