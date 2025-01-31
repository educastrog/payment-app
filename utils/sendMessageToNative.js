export function sendMessageToNative(message) {
    // iOS WebView
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.observer) {
      window.webkit.messageHandlers.observer.postMessage(JSON.stringify(message));
    }

    // Android WebView
    if (window.AndroidObserver) {
      window.AndroidObserver.postMessage(JSON.stringify(message));
    }

    // Browser
    if (!window.webkit && !window.AndroidObserver) {
      console.log('Sending message to browser console:', message);
    }
  }