// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

const dev = "production" === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
		    pages: "docs",
		    assets: "docs"
		}),
		prerender: {
			entries: ['*'] // prerender everything
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/urban-air-quality' : ''
		}		  
	}
};

export default config;