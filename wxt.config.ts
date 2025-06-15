import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  manifestVersion: 3,
  browser: 'chrome',
  targetBrowsers: ['chrome', 'firefox'],
  outDir: 'dist',
  entrypointsDir: 'entrypoints',
});
