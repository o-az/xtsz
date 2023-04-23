import { execa } from 'execa'
import * as assert from 'node:assert'
import { after, before, describe, it } from 'node:test'
import { server } from './cases/redirect-server'

const expectedResult = `{ result: { foo: 'bar' } }`

describe('should test where request status is 301, 302, or 307', async () => {
  before(() =>
    server.listen(3006, () => {
      console.log('Server running at http://localhost:3006/')
    })
  )
  it('should run a TypeScript file', async () => {
    const { stdout } = await execa('node_modules/.bin/xtsz', ['--file', './test/cases/redirected.ts'])
    assert.equal(stdout, expectedResult)
    after(() => server.close())
  })
})
