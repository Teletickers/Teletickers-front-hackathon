// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercelAdapter from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercelAdapter(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});