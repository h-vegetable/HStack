declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean;
    __MICRO_APP_NAME__?: string;
    __MICRO_APP_BASE_ROUTE__?: string;
  }
}

/**
 * Detect whether current page is running inside a micro-app sandbox.
 * micro-app injects `window.__MICRO_APP_ENVIRONMENT__` at runtime.
 */
export function isInMicroApp(): boolean {
  return typeof window !== 'undefined' && Boolean(window.__MICRO_APP_ENVIRONMENT__);
}

export function getMicroAppName(): string | undefined {
  return typeof window !== 'undefined' ? window.__MICRO_APP_NAME__ : undefined;
}

export function getMicroAppBaseRoute(): string | undefined {
  return typeof window !== 'undefined' ? window.__MICRO_APP_BASE_ROUTE__ : undefined;
}

export {};
