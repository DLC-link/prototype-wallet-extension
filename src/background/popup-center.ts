interface PopupOptions {
  url?: string;
  title?: string;
  w?: number;
  h?: number;
  skipPopupFallback?: boolean;
}
export function popupCenter(options: PopupOptions): Promise<chrome.windows.Window> {
  const { url, w = 405, h = 600 } = options;

  return new Promise(resolve => {
    // @see https://developer.chrome.com/docs/extensions/reference/windows/#method-getCurrent
    chrome.windows.getCurrent(async () => {
      const popup = await chrome.windows.create({
        url,
        width: w,
        height: h,
        focused: true,
        type: 'popup',
      });

      resolve(popup);
    });
  });
}
