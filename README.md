# **`xtsz`**  

```sh
# pnpm
pnpm add --save-dev xtsz
# yarn
yarn add --dev xtsz
# npm
npm install --save-dev xtsz
```

```sh
xtsz is a TypeScript and JavaScript (Node.js) runner that supports https-imports.
It can run ESM and CJS: .ts, .js, .cjs, .mjs.

Usage:
  $ xtsz <filepath>


Options:
  --file  The file to run. Can be passed as a flag or as an argument.
  --help, -h  Show this help message.

Examples:
  $ xtsz ./src/index.ts
  $ xtsz ./src/index.js
  $ xtsz ./src/index.cjs

  $ xtsz --file ./src/index.ts
  $ xtsz --file ./src/index.js
  $ xtsz --file ./src/index.cjs

  $ xtsz --help
  $ xtsz help

  - "What is https imports?"
  See https://nodejs.org/api/esm.html#https-and-http-imports

  - "How does this package work?"
  It uses a custom esbuild plugin to handle https imports and uses tsx to run TypeScript & ESM.
```
