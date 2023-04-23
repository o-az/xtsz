// start a node server and redirect to another url
import http from 'node:http'

const redirectTo =
  'https://gist.githubusercontent.com/o-az/e8ed1e89fde52af306099ed28e297cae/raw/51a1d68f54ba0718c2ab72a52b97f13cf613563f/sample.js'

export const server = http.createServer((_request, response) => {
  response.writeHead(301, { Location: redirectTo })
  response.end()
})
