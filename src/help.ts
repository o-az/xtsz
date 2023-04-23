const ansi = {
  reset: '\u001B[0m',
  backgroundBrightRed: '\u001B[101m',
  green: '\u001B[32m',
  brightPurple: '\u001B[95m',
  yellow: '\u001B[38;5;226m',
  bold: '\u001B[1m',
  underline: '\u001B[4m',
}

export const helpMessage = `
  ${ansi.bold}xtsz${ansi.reset} is a TypeScript and JavaScript (Node.js) file runner that supports https-imports and running external files directly from CLI.
  It can run ESM and CJS: .ts, .js, .cjs, .mjs.

  ${ansi.bold}Usage:${ansi.reset}
    $${ansi.green} xtsz <filepath> ${ansi.reset}
    $${ansi.green} xtsz <url> ${ansi.reset}

  ${ansi.bold}Options:${ansi.reset}
    ${ansi.green}-f, --file${ansi.reset}${ansi.brightPurple}  The file to run. Can be passed as a flag or as the only argument with no other flags. ${ansi.reset}
    ${ansi.green}-u, --url ${ansi.reset}${ansi.brightPurple}  The url to run. Can be passed as a flag or as the only argument with no other flags. ${ansi.reset}
    ${ansi.green}-h, --help${ansi.reset}${ansi.brightPurple}  Show this help message. ${ansi.reset}

  ${ansi.bold}Examples:${ansi.reset}
    ${ansi.green}$ xtsz ./src/index.ts
    $ xtsz --file ./src/index.cjs
    
    $ xtsz --url https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/f997df001ee197f638af14d09309eb3c060240b0/sample-iife.js
    $ xtsz https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/f997df001ee197f638af14d09309eb3c060240b0/sample-iife.js

    ${ansi.green}$ xtsz help, --help, -h${ansi.reset}
    
    ${ansi.bold}${ansi.yellow}- "What is https imports?"${ansi.reset}
    See https://nodejs.org/api/esm.html#https-and-http-imports
    
    ${ansi.bold}${ansi.yellow}- "How does this package work?"${ansi.reset}
    It uses a custom esbuild plugin to handle https imports and uses tsx to run TypeScript & ESM.

    ${ansi.bold}${ansi.backgroundBrightRed} BUGS ${ansi.reset}
    ${ansi.underline}https://github.com/o-az/xtsz/issues
`
