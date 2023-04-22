import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  shims: true,
  silent: false,
  minify: true,
  outDir: './dist',
  platform: 'node',
  format: ['esm'],
  entry: ['./src/index.ts'],
  banner: _context => ({ js: `#!/usr/bin/env node` }),
})
