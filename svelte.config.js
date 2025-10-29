import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: 'index.html'
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/urban-air-quality' : ''
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
