import { Windows } from 'webextension-polyfill';

const POPUP_CENTER_WIDTH = 442;
const POPUP_CENTER_HEIGHT = 646;

interface PopupOptions {
  url?: string;
  title?: string;
  w?: number;
  h?: number;
  skipPopupFallback?: boolean;
}
export function popupCenter(options: PopupOptions): Promise<chrome.windows.Window> {
  const { url, w = POPUP_CENTER_WIDTH, h = POPUP_CENTER_HEIGHT } = options;

  return new Promise(resolve => {
    // @see https://developer.chrome.com/docs/extensions/reference/windows/#method-getCurrent
    chrome.windows.getCurrent(async win => {
      // these units take into account the distance from
      // the farthest left/top sides of all displays
      const dualScreenLeft = win.left;
      const dualScreenTop = win.top;

      // dimensions of the window that originated the action
      const width = win.width;
      const height = win.height;

      const left = Math.floor(width / 2 - w / 2 + dualScreenLeft);
      const top = Math.floor(height / 2 - h / 2 + dualScreenTop);

      const popup = await chrome.windows.create({
        url,
        width: w,
        height: h,
        top,
        left,
        focused: true,
        type: 'popup',
      });

      resolve(popup);
    });
  });
}