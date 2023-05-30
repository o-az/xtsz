//@ts-ignore
import packageJsonImport from 'https://esm.sh/react@18.2.0/package.json'
const packageJsonRequire = require('https://esm.sh/react@18.2.0/package.json')

console.log(packageJsonImport === packageJsonRequire, packageJsonImport.author === packageJsonRequire.author, {
  packageJsonImport,
  packageJsonRequire,
})
