import { execa } from 'execa'
import { it } from 'node:test'
import * as assert from 'node:assert'

it('should run a TypeScript file', async () => {
  const result = `{ result: { foo: 'bar' } }`
  const { stdout } = await execa('node_modules/.bin/xtsz', ['./test/cases/index.ts'])
  assert.deepEqual(result, stdout)
})

it('should run a JavaScript file', async () => {
  const result = `{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }`
  const { stdout } = await execa('node_modules/.bin/xtsz', ['./test/cases/index.js'])
  assert.equal(stdout, result)
})

it('should run a CJS file', async () => {
  const result = `{ result: { foo: 'bar' } }
{ userId: 1, id: 1, title: 'delectus aut autem', completed: false }`
  const { stdout } = await execa('node_modules/.bin/xtsz', ['./test/cases/index.cjs'])
  assert.equal(stdout, result)
})

it('should run a file with --file flag', async () => {
  const result = `{ result: { foo: 'bar' } }`
  const { stdout } = await execa('node_modules/.bin/xtsz', ['--file', './test/cases/index.ts'])
  assert.equal(stdout, result)
})

it('should return a help message', async () => {
  const { stdout } = await execa('node_modules/.bin/xtsz', ['--help'])
  assert.ok(stdout.includes('xtsz'))
})
