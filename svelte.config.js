import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({})],

	kit: {
		prerender: {
			default: false
		},
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components')
				}
			}
		},
		// hydrate the <div id="svelte"> element in src/app.html
		// target: '#svelte',
		// serviceWorker: {
		// 	register: false,
		// }
	}
};

export default config;
