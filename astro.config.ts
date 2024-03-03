import mdx from '@astrojs/mdx';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryubi98.github.io',
  base: '/portfolio',
  integrations: [mdx(), icon()],
  vite: {
    plugins: [pluginBasicSsl()],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
