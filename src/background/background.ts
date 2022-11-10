import { popupCenter } from "./popup-center";

chrome.runtime.onMessageExternal.addListener(
  async function(request, sender, sendResponse) {
    console.log(request, sender);

    await popupCenter({ url: '/index.html'})

    sendResponse({success: true })
  });
