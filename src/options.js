function save_options() {
  var counterpartyWalletURL = document.getElementById(
    'counterparty-wallet-url'
  ).value
  chrome.storage.sync.set({
    counterpartyWalletURL: counterpartyWalletURL,
  })
}

document.getElementById('save').addEventListener('click', save_options)
