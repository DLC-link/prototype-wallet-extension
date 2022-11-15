import { popupCenter } from "./popup-center";
interface RequestInterface {
  action: 'get-offer' | 'accept-offer',
  data: string
}

chrome.runtime.onMessageExternal.addListener(
  async function(request: RequestInterface, sender, sendResponse) {
    console.log(request, sender);

    switch(request.action) {
      case 'get-offer': {
        console.log('[BG script]: request.data:', request.data);
        await popupCenter({ url: `/index.html`});

        // TODO: this works because we want to wait or the window to load fully. Should at least show the user that its loading.
        setTimeout(
          () => chrome.runtime.sendMessage({ action: 'get-offer', data: request.data }, (response) => console.log('[BG script]: response:', response)),
          500
        )
        break;
      }
    }

    sendResponse({success: true })
  });
