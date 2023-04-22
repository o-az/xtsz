const ansi = {
  reset: '\u001B[0m',
  green: '\u001B[32m',
  brightPurple: '\u001B[95m',
  yellow: '\u001B[38;5;226m',
  bold: '\u001B[1m',
}

export const helpMessage = `${ansi.bold}xtsz${ansi.reset} is a TypeScript and JavaScript (Node.js) file runner that supports https-imports.
It can run ESM and CJS: .ts, .js, .cjs, .mjs.

${ansi.bold}Usage:${ansi.reset}
  $${ansi.green} xtsz <filepath> ${ansi.reset}

${ansi.bold}Options:${ansi.reset}
  ${ansi.green}--file ${ansi.reset}${ansi.brightPurple}  The file to run. Can be passed as a flag or as an argument. ${ansi.reset}
  ${ansi.green}--help, -h${ansi.reset}${ansi.brightPurple}  Show this help message. ${ansi.reset}

${ansi.bold}Examples:${ansi.reset}
  ${ansi.green}$ xtsz ./src/index.ts
  $ xtsz ./src/index.js
  $ xtsz ./src/index.cjs

  $ xtsz --file ./src/index.ts
  $ xtsz --file ./src/index.js
  $ xtsz --file ./src/index.cjs

  ${ansi.green}$ xtsz --help
  $ xtsz help${ansi.reset}
  
  ${ansi.bold}${ansi.yellow}- "What is https imports?"${ansi.reset}
  See https://nodejs.org/api/esm.html#https-and-http-imports
  
  ${ansi.bold}${ansi.yellow}- "How does this package work?"${ansi.reset}
  It uses a custom esbuild plugin to handle https imports and uses tsx to run TypeScript & ESM.`
