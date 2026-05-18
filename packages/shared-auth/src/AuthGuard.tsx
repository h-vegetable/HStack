import { type ReactNode } from 'react';

import { useAuth } from './useAuth';

export interface AuthGuardProps {
  children: ReactNode;
  /** Rendered when user is unauthenticated. */
  fallback?: ReactNode;
  /** Rendered while the auth status is being resolved. */
  loading?: ReactNode;
}

/**
 * Route-level guard. Renders children only when authenticated.
 */
export function AuthGuard({ children, fallback = null, loading = null }: AuthGuardProps) {
  const { status } = useAuth();
  if (status === 'idle' || status === 'authenticating') return <>{loading}</>;
  if (status !== 'authenticated') return <>{fallback}</>;
  return <>{children}</>;
}
