import { regtest } from 'bitcoinjs-lib/src/networks'

// For the value of blockchainExplorerBaseUrl:
// when running the extension from node as a live compiled project (for faster dev and hot-reloading), use http://localhost:8080/electrs/
// when running the extension as a pre-compiled chrome-extension, use http://localhost:3004/
const Config = {
  network: regtest,
  // blockchainExplorerBaseUrl: 'http://localhost:9090/electrs/',
  blockchainExplorerBaseUrl: 'http://localhost:3004/',
}

export default Config