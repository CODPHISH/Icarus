import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react
    react({
      babel: { plugins: ['macros'] }
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      exclude: ['**/components/**/*']
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: true
    })
  ],
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
});
