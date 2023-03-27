import adapter from "@sveltejs/adapter-cloudflare";
import preprocess from "svelte-preprocess";
// import { vitePreprocess } from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({postcss:true}),

  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
  },
};

export default config;
