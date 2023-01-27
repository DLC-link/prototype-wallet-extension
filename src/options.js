function save_options() {
  var counterpartyWalletURL = document.getElementById(
    'counterparty-wallet-url'
  ).value
  chrome.storage.sync.set({
    counterpartyWalletURL: counterpartyWalletURL,
  })
}

function fetch_options() {
  chrome.storage.sync.get(['counterpartyWalletURL'], function (data) {
    document.getElementById('currVal').innerHTML = data.counterpartyWalletURL;
  });
}

document.getElementById('save').addEventListener('click', save_options)
document.getElementById('fetch').addEventListener('click', fetch_options)
