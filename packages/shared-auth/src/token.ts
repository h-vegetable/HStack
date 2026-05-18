import { storage } from '@hstack/shared-utils';

const TOKEN_KEY = 'hstack:auth:token';

export const tokenStorage = {
  load(): string | null {
    return storage.get<string>(TOKEN_KEY);
  },
  save(token: string): void {
    storage.set(TOKEN_KEY, token);
  },
  clear(): void {
    storage.remove(TOKEN_KEY);
  },
};
