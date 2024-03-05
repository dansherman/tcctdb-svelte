import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

		kit: {
			adapter: adapter({
				// See below for an explanation of these options
				// routes: {
				// 	include: ['/*'],
				// 	exclude: ['<all>']
				// }
			}),
			alias: {
				'$components/*': 'src/components/*'
			},
			prerender: {
				concurrency: 8,
				handleHttpError: 'warn'
			}
		}
};

export default config;
