//@ts-expect-error
import { createPublicClient, http } from 'https://esm.sh/viem'
//@ts-expect-error
import { mainnet } from 'https://esm.sh/viem/chains'
//@ts-expect-error
import packageJsonImport from 'https://esm.sh/viem/package.json'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const blockNumber = await client.getBlockNumber()
console.log({ blockNumber })

console.log(`viem version: ${packageJsonImport.version}`)

//@ts-expect-error
import snarkdown from 'https://esm.sh/snarkdown'

const md = '_this_ is **easy** to `use`.'
const html = snarkdown(md)
console.log(html)
// <em>this</em> is <strong>easy</strong> to <code>use</code>.
