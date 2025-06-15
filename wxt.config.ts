import { defineConfig } from 'wxt';

export default defineConfig({
  manifestVersion: 3,
  browser: 'chrome',
  targetBrowsers: ['chrome', 'firefox'],
  outDir: 'dist',
  entrypointsDir: 'src/entrypoints',
});
