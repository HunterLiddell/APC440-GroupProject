import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	build: {
		outDir: 'dist'
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			// The output directory (default is 'build')
			pages: 'dist',
			assets: 'dist',
			fallback: 'index.html', // Enables single-page app routing
			precompress: false
		})
	}
};

export default config;
