import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const entryPath = resolve(__dirname, 'src/js/AnchorTo.js');

export default defineConfig({
    root,
    publicDir: 'public',
    plugins: [], 
    build: {
      lib: {
        entry: entryPath,
        name: 'AnchorTo', // Library name as : Counter | etc
        formats: ['es', 'umd'], // Output formats as : es | umd, es is for modern browsers, umd is for older browsers
        fileName: (format,name) => `${name}.${format}.js`, // File naming as : reveal-it | collapsify | etc
      },
      outDir, 
      emptyOutDir: true, 
      rollupOptions: {
        external: ['gsap'],
        output: {
          globals: {
            gsap: 'gsap',
          },
          name: 'AnchorTo',
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@js': resolve(__dirname, './src/js'),
        '@scss': resolve(__dirname, './src/scss'),
        '@assets': resolve(__dirname, './src/assets'),
      },
    },
});