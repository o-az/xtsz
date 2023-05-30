import packageJsonImport from '../../package.json'
const packageJsonRequire = require('../../package.json')

console.log(
  {
    packageJsonImport,
    packageJsonRequire,
  },
  packageJsonImport === packageJsonRequire,
  packageJsonImport.author === packageJsonRequire.author
)
