import { regtest } from 'bitcoinjs-lib/src/networks'

// For the value of blockchainExplorerBaseUrl:
// when running the extension from node as a live compiled project (for faster dev and hot-reloading), use http://localhost:8081/electrs/
// when running the extension as a pre-compiled chrome-extension, use http://localhost:3004/
const Config = {
  network: regtest,
  bitcoinWalletApi: 'https://dev-oracle.dlc.link/electrs/',
  blockChainExplorerBaseUrl: 'http://stx-btc1.dlc.link:8001/'
  // bitcoinWalletApi: 'http://localhost:3004',
  // blockChainExplorerBaseUrl: 'http://localhost:8001/'
}

export default Config
