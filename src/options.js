function save_options() {
  var counterpartyWalletURL = document.getElementById(
    'counterparty-wallet-url'
  ).value
  console.log('Counterparty Wallet URL: ')
  console.log(walletAddress)
  chrome.storage.sync.set(
    {
      counterpartyWalletURL: counterpartyWalletURL,
    },
    function () {
      var status = document.getElementById('status')
      status.textContent = 'Options saved.'
      setTimeout(function () {
        status.textContent = ''
      }, 750)
    }
  )
}

document.getElementById('save').addEventListener('click', save_options)
