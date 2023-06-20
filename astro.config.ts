import { defineConfig } from 'astro/config';
import astroCompress from 'astro-compress';
import pluginBasicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryubi98.github.io',
  base: '/portfolio',
  integrations: [astroCompress()],
  vite: {
    plugins: [pluginBasicSsl()],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
