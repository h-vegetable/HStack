import { create } from 'zustand';

import { tokenStorage } from './token';
import type { AuthStore } from './types';

/**
 * Global auth store (Zustand).
 * Used directly by the base shell and by sub-apps in standalone mode.
 * In embedded mode, sub-apps read auth via micro-app data instead.
 */
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: tokenStorage.load(),
  status: 'idle',
  signIn: ({ user, token }) => {
    tokenStorage.save(token);
    set({ user, token, status: 'authenticated' });
  },
  signOut: () => {
    tokenStorage.clear();
    set({ user: null, token: null, status: 'unauthenticated' });
  },
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
}));
