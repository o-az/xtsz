#!/usr/bin/env node
import * as esbuild from 'esbuild'
//
import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'
import util from 'node:util'
import process from 'node:process'
import childProcess from 'node:child_process'
//
import { helpMessage } from './help.js'
import { httpPlugin, treatAsString } from './https-loader.js'

const runtimeMap = {
  node: 'node',
  deno: 'deno run --allow-all',
  bun: 'bun',
}

const absolutePath = (_path: string) => (path.isAbsolute(_path) ? _path : path.join(process.cwd(), _path))

async function main() {
  try {
    const _arguments = process.argv
    const [urlOrPath, isURL] = meow(_arguments)
    /**
     * If ['json', ...treatAsString].includes(fileExtension), then fetch/read it and write it to stdout
     */
    if (['json', ...treatAsString].includes(urlOrPath.split('.').pop() ?? '')) {
      const content = isURL
        ? await fetch(urlOrPath).then((response) => response.text())
        : fs.readFileSync(urlOrPath, { encoding: 'utf-8' })
      process.stdout.write(content)
      process.exit(0)
    }

    const entryPointPath = entryPoint({ urlOrPath, isURL })
    // create a temporary file for esbuild to write to
    const outFile = `/tmp/${Date.now()}-out.mjs`

    await esbuild.build({
      entryPoints: [entryPointPath],
      plugins: [httpPlugin],
      outfile: outFile,
      bundle: true,
      target: 'esnext',
      format: 'esm',
    })

    Object.assign(process.env, { NODE_NO_WARNINGS: 1 })
    // first argv is the runtime
    const [runtimePath] = _arguments
    const { name: runtime } = path.parse(runtimePath)
    // run the temporary file
    const { stdout } = await util.promisify(childProcess.exec)(
      `${runtimeMap[runtime as unknown as keyof typeof runtimeMap]} ${outFile}`
    )
    process.stdout.write(stdout)
    // Now that we've ran the file, we can delete it
    fs.rmSync(outFile)
    return stdout
  } catch (error) {
    process.stderr.write(error + '\n')
    process.stdout.write(
      `---\n\n\n${helpMessage}\n\n\nIf this is a bug, Please report it to https://github.com/o-az/xtsz/issues. Really appreciate it!`
    )
    process.exit(1)
  }
}

main()

function entryPoint({ urlOrPath, isURL }: { urlOrPath: string; isURL: boolean }): string {
  if (!isURL) return urlOrPath // <- it's a file aka path
  const temporaryEntryFile = `/tmp/${Date.now()}-entry.mjs`
  // if json, import it as json
  if (urlOrPath.endsWith('.json')) {
    console.log({ urlOrPath })
    fs.writeFileSync(temporaryEntryFile, `export default import('${urlOrPath}')`)
    return temporaryEntryFile
  }
  fs.writeFileSync(temporaryEntryFile, `import '${urlOrPath}'`)
  return temporaryEntryFile
}

function meow(_arguments: Array<string>): [entryPoint: string, isURL: boolean] {
  const [_argument0, _argument1, argument2, argument3] = _arguments
  if (process.argv.length <= 2 || ['help', '--help', '-h'].includes(argument2)) {
    process.stdout.write(helpMessage)
    process.exit(0)
  }
  // url: if no argument is passed
  if (url.parse(argument2).protocol) {
    return [argument2, true]
  }
  // url: -u / --url flag
  if (['-u', '--url'].includes(argument2) && url.parse(argument3)) {
    return [argument3, true]
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
