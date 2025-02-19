import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
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
    // https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react
    react({
      babel: { plugins: ['macros'] }
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: 'src/pages',
      exclude: ['**/components/**/*']
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['react', 'react-router'],
      dts: true
    }),

    tailwindcss()
  ],
  css: {
    postcss: {
      plugins: [autoprefixer]
    }
  }
});
