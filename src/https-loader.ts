import https from 'node:https'
import http from 'node:http'
import { Buffer } from 'node:buffer'
import type { Plugin } from 'esbuild'

/* @see https://esbuild.github.io/plugins/#http-plugin */
export const httpPlugin: Plugin = {
  name: 'http',
  setup: (build) => {
    build.onResolve({ filter: /^https?:\/\// }, (arguments_) => ({
      path: arguments_.path,
      namespace: 'http-url',
    }))

    build.onResolve({ filter: /.*/, namespace: 'http-url' }, (arguments_) => ({
      path: new URL(arguments_.path, arguments_.importer).toString(),
      namespace: 'http-url',
    }))

    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (arguments_) => {
      //
      const contents = await new Promise((resolve, reject) => {
        //
        function fetch(url: string) {
          const library = url.indexOf('https') === 0 ? https : http
          const _request = library
            .get(url, (response) => {
              if (response['statusCode'] && [301, 302, 307].includes(response['statusCode'])) {
                const location = response['headers']?.['location'] ?? ''
                fetch(new URL(location, url).toString())
                _request.destroy()
              } else if (response.statusCode === 200) {
                const chunks: Array<Uint8Array> = []
                response.on('data', (chunk) => chunks.push(chunk))
                response.on('end', () => resolve(Buffer.concat(chunks)))
              } else reject(new Error(`GET ${url} failed: status ${response.statusCode}`))
            })
            .on('error', reject)
        }
        //
        fetch(arguments_.path)
      })
      //
      return { contents } as any
    })
  },
}
