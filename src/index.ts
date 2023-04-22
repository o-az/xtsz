#!/usr/bin/env node
import meow from 'meow'
import { $, execa } from 'execa'
import * as esbuild from 'esbuild'
import { httpPlugin } from './https-loader'
import { helpMessage } from './help'

function woof() {
  const cli = meow(helpMessage, {
    importMeta: import.meta,
    flags: {
      file: {
        type: 'string',
        shortFlag: '-f',
        // file can be passed as a flag or as an argument
        isRequired: false,
      },
    },
  })
  const [inputFile] = cli.input
  const { file } = cli.flags
  const filePath = inputFile || file
  if (!filePath || filePath.length === 0) return cli.showHelp(2)

  return filePath
}

async function main() {
  try {
    const process = await import('node:process')
    if (process.argv[2] === 'help') return process.stdout.write(helpMessage)
    const filePath = woof()
    const ENTRY_POINT = filePath
    const OUT_FILE = `/tmp/${Date.now()}-out.mjs`

    await esbuild.build({
      entryPoints: [ENTRY_POINT],
      bundle: true,
      outfile: OUT_FILE,
      target: 'esnext',
      format: 'esm',
      plugins: [httpPlugin],
    })

    const { stdout } = await execa('tsx', [OUT_FILE])
    process.stdout.write(stdout)
    // lastly, remove the file
    await $`rm -rf ${OUT_FILE}`
    return stdout
  } catch (error) {
    console.error(error)
    console.info('\n\n\nPlease report this error to https://github.com/o-az/xtsz/issues. Really appreciate it!')
    process.exit(1)
  }
}

main()
