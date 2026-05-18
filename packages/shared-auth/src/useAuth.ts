import { isInMicroApp } from '@hstack/shared-utils';
import { useEffect, useState } from 'react';

import { useAuthStore } from './store';
import type { AuthState } from './types';

/**
 * Mode-aware auth hook.
 * - In standalone mode: returns the global Zustand store directly.
 * - In embedded (micro-app sandbox) mode: subscribes to base-app data injected via
 *   `microApp.setData(name, payload)` and returns a synthesized state.
 */
export function useAuth(): AuthState & {
  signOut: () => void;
} {
  const standalone = !isInMicroApp();
  const storeUser = useAuthStore((s) => s.user);
  const storeToken = useAuthStore((s) => s.token);
  const storeStatus = useAuthStore((s) => s.status);
  const storeSignOut = useAuthStore((s) => s.signOut);

  const [embeddedState, setEmbeddedState] = useState<AuthState>({
    user: null,
    token: null,
    status: 'idle',
  });

  useEffect(() => {
    if (standalone) return;
    // Inside micro-app, subscribe to data injected by base shell.
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ user: AuthState['user']; token: string | null }>)
        .detail;
      if (!detail) return;
      setEmbeddedState({
        user: detail.user,
        token: detail.token,
        status: detail.user ? 'authenticated' : 'unauthenticated',
      });
    };
    window.addEventListener('hstack:auth', handler as EventListener);
    return () => window.removeEventListener('hstack:auth', handler as EventListener);
  }, [standalone]);

  if (standalone) {
    return {
      user: storeUser,
      token: storeToken,
      status: storeStatus,
      signOut: storeSignOut,
    };
  }
  return {
    ...embeddedState,
    signOut: () => {
      // In embedded mode, ask base shell to sign out via dispatch.
      window.dispatchEvent(new CustomEvent('hstack:auth:signout-request'));
    },
  };
}
