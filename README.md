# **`xtsz`**  

### Install

```sh
# pnpm
pnpm add --global xtsz
```

```sh
# yarn
yarn global add xtsz
```

```sh
# npm
npm install --global xtsz
```

### Run

```sh
xtsz ./path/to/file.ts
```

#### as a `devDependency`

```sh
# install
pnpm add --save-dev xtsz
# run
pnpm dlx xtsz ./path/to/file.ts
# or
xtsz https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/f997df001ee197f638af14d09309eb3c060240b0/sample-iife.js
```

```sh
xtsz is a TypeScript and JavaScript (Node.js) file runner that supports https-imports and running external files directly from CLI.
It can run ESM and CJS: .ts, .js, .cjs, .mjs.

Usage:
  $ xtsz <filepath>
  $ xtsz <url>

Options:
  -f, --file  The file to run. Can be passed as a flag or as the only argument with no other flags.
  -u, --url   The url to run. Can be passed as a flag or as the only argument with no other flags.
  -h, --help  Show this help message.

Examples:
  $ xtsz ./src/index.ts
  $ xtsz --file ./src/index.cjs

  $ xtsz https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/f997df001ee197f638af14d09309eb3c060240b0/sample-iife.js

  $ xtsz help, --help, -h

  - "What is https imports?"
  See https://nodejs.org/api/esm.html#https-and-http-imports

  - "How does this package work?"
  It uses a custom esbuild plugin to handle https imports and uses tsx to run TypeScript & ESM.

    BUGS
  https://github.com/o-az/xtsz/issues
```
