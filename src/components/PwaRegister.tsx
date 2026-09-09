'use client';

import { useEffect } from 'react';

/**
 * Registers the PWA service worker. Only runs in the browser where the
 * Service Worker API is available (secure contexts / localhost).
 */
export default function PwaRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV === 'development') return;

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        // Optionally surface update availability (see PWA update UX)
        registration.update();
      } catch (err) {
        // Service worker registration is best-effort; never block the page.
        console.warn('PWA service worker registration failed', err);
      }
    };

    window.addEventListener('load', register);
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
