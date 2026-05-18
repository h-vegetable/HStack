import type { Locale, Theme } from '@hstack/shared-types';
import { storage } from '@hstack/shared-utils';
import { create } from 'zustand';

interface GlobalState {
  theme: Theme;
  locale: Locale;
  sidebarCollapsed: boolean;
}

interface GlobalActions {
  setTheme: (theme: Theme) => void;
  setLocale: (locale: Locale) => void;
  toggleSidebar: () => void;
}

const STORAGE_KEY = 'hstack:global';

const persisted =
  storage.get<Pick<GlobalState, 'theme' | 'locale' | 'sidebarCollapsed'>>(STORAGE_KEY);

export const useGlobalStore = create<GlobalState & GlobalActions>((set, get) => ({
  theme: persisted?.theme ?? 'light',
  locale: persisted?.locale ?? 'zh-CN',
  sidebarCollapsed: persisted?.sidebarCollapsed ?? false,
  setTheme: (theme) => {
    set({ theme });
    storage.set(STORAGE_KEY, { ...get(), theme });
  },
  setLocale: (locale) => {
    set({ locale });
    storage.set(STORAGE_KEY, { ...get(), locale });
  },
  toggleSidebar: () => {
    const next = !get().sidebarCollapsed;
    set({ sidebarCollapsed: next });
    storage.set(STORAGE_KEY, { ...get(), sidebarCollapsed: next });
  },
}));
