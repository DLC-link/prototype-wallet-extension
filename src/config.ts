import { regtest } from 'bitcoinjs-lib/src/networks'

const Config = {
  network: regtest,
  blockchainExplorerBaseUrl: 'http://localhost:8080/electrs/',
}

export default Config
