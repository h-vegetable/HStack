import type { AuthUser } from '@hstack/shared-types';

export type AuthStatus = 'idle' | 'authenticating' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
}

export interface AuthActions {
  signIn: (payload: { user: AuthUser; token: string }) => void;
  signOut: () => void;
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStatus) => void;
}

export type AuthStore = AuthState & AuthActions;
