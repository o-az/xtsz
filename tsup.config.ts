import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  shims: true,
  silent: false,
  minify: true,
  outDir: './dist',
  platform: 'node',
  target: 'esnext',
  format: ['esm'],
  entry: ['./src/index.ts'],
})
