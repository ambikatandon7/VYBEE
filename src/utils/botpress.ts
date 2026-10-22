/**
 * Botpress Webchat Integration Utility for VYBE Merch Stylist
 * Connects directly to the official Botpress Cloud Webchat v5 runtime.
 */

declare global {
  interface Window {
    botpress?: {
      init?: (config: Record<string, unknown>) => void;
      open?: () => void;
      close?: () => void;
      toggle?: () => void;
      isLoaded?: boolean;
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      sendPayload?: (payload: unknown) => void;
      sendMessage?: (text: string) => void;
      [key: string]: unknown;
    };
  }
}

/**
 * Programmatically opens the Botpress Webchat widget
 */
export const openBotpressWebchat = (prefillMessage?: string): void => {
  if (typeof window === 'undefined') return;

  const tryOpen = () => {
    // 1. Direct official Botpress v5 API
    if (window.botpress && typeof window.botpress.open === 'function') {
      try {
        window.botpress.open();
        if (prefillMessage && typeof window.botpress.sendMessage === 'function') {
          // If Botpress supports sendMessage directly
          try {
            window.botpress.sendMessage(prefillMessage);
          } catch {
            // Optional prefill error ignored
          }
        }
        return true;
      } catch (err) {
        console.warn('Botpress open() invocation error:', err);
      }
    }

    // 2. DOM Launcher button fallback (Botpress injects floating trigger)
    const selectors = [
      '#bp-web-widget-launcher',
      'button[aria-label*="chat" i]',
      'button[aria-label*="webchat" i]',
      'button[aria-label*="stylist" i]',
      '.bpw-widget-btn',
      '.bp-widget-widget',
      '[class*="bpw-floating-button"]',
      '[class*="bp-widget-btn"]',
      '#bp-widget',
      'iframe[id*="bp-web-widget"]'
    ];

    for (const sel of selectors) {
      const el = document.querySelector<HTMLElement>(sel);
      if (el) {
        el.click();
        return true;
      }
    }

    return false;
  };

  const opened = tryOpen();
  if (!opened) {
    // Retry shortly in case Botpress script is finalizing initialization
    setTimeout(tryOpen, 400);
    setTimeout(tryOpen, 1000);
  }
};

/**
 * Programmatically toggles the Botpress Webchat widget
 */
export const toggleBotpressWebchat = (): void => {
  if (typeof window === 'undefined') return;
  if (window.botpress && typeof window.botpress.toggle === 'function') {
    window.botpress.toggle();
  } else {
    openBotpressWebchat();
  }
};
