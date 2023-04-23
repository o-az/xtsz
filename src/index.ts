#!/usr/bin/env node
import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import { build } from 'esbuild'
import { $, execa } from 'execa'
import { helpMessage } from './help'
import { httpPlugin } from './https-loader'

const absolutePath = (_path: string) => path.join(process.cwd(), _path)
// const isHttp = (urlString: string) => urlString.indexOf('http') === 0 || urlString.indexOf('https') === 0

async function main() {
  try {
    const [urlOrPath, isURL] = meow()

    const entryPointPath = entryPoint({ urlOrPath, isURL })

    // create a temporary file for esbuild to write to
    const outFile = `/tmp/${Date.now()}-out.mjs`

    await build({
      entryPoints: [entryPointPath],
      bundle: true,
      outfile: outFile,
      target: 'esnext',
      format: 'esm',
      plugins: [httpPlugin],
    })
    Object.assign(process.env, { NODE_NO_WARNINGS: 1 })
    const { stdout } = await execa('tsx', [outFile])
    process.stdout.write(stdout)
    // Now that we've ran the file, we can delete it
    await $`rm -rf ${outFile}`
    return stdout
  } catch (error) {
    console.error(error)
    console.info(
      `---\n\n\n${helpMessage}\n\n\nPlease report this error to https://github.com/o-az/xtsz/issues. Really appreciate it!`
    )
    process.exit(1)
  }
}

main()

function entryPoint({ urlOrPath, isURL }: { urlOrPath: string; isURL: boolean }): string {
  if (!isURL) return urlOrPath // <- it's a file aka path
  const temporaryEntryFile = `/tmp/${Date.now()}-entry.mjs`
  fs.writeFileSync(temporaryEntryFile, `import '${urlOrPath}'`)
  return temporaryEntryFile
}

function meow(): [entryPoint: string, isURL: boolean] {
  const [_argument0, _argument1, argument2, argument3] = process.argv
  // help / --help / -h or no argument
  if (process.argv.length <= 2 || ['help', '--help', '-h'].includes(argument2)) {
    process.stdout.write(helpMessage)
    process.exit(0)
  }
  // url: if no argument is passed
  if (url.parse(argument2)['protocol']) {
    return [argument2, true]
  }
  // url: -u / --url flag
  if (['-u', '--url'].includes(argument2) && url.parse(argument3)) {
    return [argument3, true]
    // process.exit(0)
  }
  // file: if no argument is passed
  if (fs.existsSync(argument2)) return [absolutePath(argument2), false]
  // file: -f / --file flag
  if (['-f', '--file'].includes(argument2) && fs.existsSync(argument3)) {
    return [absolutePath(argument3), false]
  }
  // if the argument is not a file
  process.stdout.write(helpMessage)
  console.error(`\n\n----\n\n"${argument2}" is not a file. Pass a valid file path.\n\n`)
  process.exit(1)
}
