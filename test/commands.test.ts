import { execa } from 'execa'
import { it } from 'node:test'
import * as assert from 'node:assert'

it('should run a TypeScript file', async () => {
  const result = `{ result: { foo: 'bar' } }`
  const { stdout } = await execa('node_modules/.bin/xtsz', ['./test/cases/index.ts'])
  assert.deepEqual(result, stdout)
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

it('should run a file with --url flag', async () => {
  const result = 'bar'
  const { stdout } = await execa('node_modules/.bin/xtsz', [
    'https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/f997df001ee197f638af14d09309eb3c060240b0/sample-iife.js',
  ])
  console.log({ stdout })
  assert.equal(stdout, result)
})

it('should return a help message', async () => {
  const { stdout } = await execa('node_modules/.bin/xtsz', ['--help'])
  assert.ok(stdout.includes('xtsz'))
})
