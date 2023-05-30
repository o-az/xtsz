import fs from 'node:fs'

// executable exists
const executableExists = fs.existsSync('./node_modules/.bin/xtsz')

export const xtszExecutable = executableExists ? './node_modules/.bin/xtsz' : './dist/index.js'
