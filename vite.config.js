import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus'; // ✅ use this

export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 8888,
  },
});
