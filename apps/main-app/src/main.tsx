import microApp from '@micro-zoe/micro-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { useGlobalStore } from './stores/global';
import './styles/global.css';

// Apply persisted theme to <html> before mount to avoid flicker.
// Uses dual mechanism: data-theme for CSS custom properties + .dark class for Tailwind/HeroUI.
function applyTheme(theme: 'light' | 'dark' | 'system') {
  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;
  const html = document.documentElement;
  html.setAttribute('data-theme', resolved);
  html.classList.toggle('dark', resolved === 'dark');
}

const initialTheme = useGlobalStore.getState().theme;
applyTheme(initialTheme);

useGlobalStore.subscribe((state) => {
  applyTheme(state.theme);
});

// Initialise micro-app sandbox.
microApp.start({
  // Shadow DOM keeps each sub-app's styles isolated.
  // Disable for dev if a sub-app has CSS issues; HeroUI generally needs special handling.
  // shadowDOM: true,
});

const container = document.getElementById('root');
if (!container) throw new Error('Root container #root not found');
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
