import { type ReactNode, useEffect } from 'react';

import { useAuthStore } from './store';

export interface AuthProviderProps {
  children: ReactNode;
  /**
   * Optional bootstrap function called once on mount.
   * Use this to validate token / fetch /me / hydrate the store.
   */
  bootstrap?: () => Promise<void> | void;
}

/**
 * Base-shell-side auth provider.
 * Despite the "Provider" name, it does NOT use React Context — Zustand store is global,
 * which avoids the "Context does not cross Shadow DOM boundary" issue with micro-app.
 */
export function AuthProvider({ children, bootstrap }: AuthProviderProps) {
  const setStatus = useAuthStore((s) => s.setStatus);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!bootstrap) {
        setStatus('unauthenticated');
        return;
      }
      setStatus('authenticating');
      try {
        await bootstrap();
        if (!cancelled) {
          // bootstrap() should call signIn() on success; otherwise default to unauthenticated.
          const { token } = useAuthStore.getState();
          setStatus(token ? 'authenticated' : 'unauthenticated');
        }
      } catch {
        if (!cancelled) setStatus('unauthenticated');
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [bootstrap, setStatus]);

  return <>{children}</>;
}
