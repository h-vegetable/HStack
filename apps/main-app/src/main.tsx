import microApp from '@micro-zoe/micro-app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { useGlobalStore } from './stores/global';
import './styles/global.css';

// Apply persisted theme class to <html> before mount to avoid flicker.
const initialTheme = useGlobalStore.getState().theme;
if (initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
}
useGlobalStore.subscribe((state) => {
  const html = document.documentElement;
  if (state.theme === 'dark') html.classList.add('dark');
  else html.classList.remove('dark');
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
