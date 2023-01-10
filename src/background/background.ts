import { popupCenter } from "./popup-center";
export interface RequestInterface {
  action: 'get-offer' | 'get-offer-internal',
  data: {
    offer: string,
    counterparty_wallet_url: string
  }
}

chrome.runtime.onMessageExternal.addListener(
  async function(request: RequestInterface, sender, sendResponse) {
    switch(request.action) {
      case 'get-offer': {
        console.log('[BG script]: request.data:', request.data);
        await popupCenter({ url: `/popup-center.html`});

        // TODO: this works because we want to wait or the window to load fully. Should at least show the user that its loading.
        setTimeout(
          () => chrome.runtime.sendMessage({ action: 'get-offer-internal', data: request.data}, (response) => console.log('[BG script]: response back from popuphandler:', response)),
          700
        )
        break;
      }
    }

    sendResponse({success: true })
  });
