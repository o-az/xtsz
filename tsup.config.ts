import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  shims: true,
  silent: false,
  format: ['esm'],
  outDir: './dist',
  platform: 'node',
  target: ['esnext'],
  entry: ['./src/index.ts'],
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger']
  },
  // we want to minify but only when about to publish
  minify: Boolean(process.env.CI),
})
