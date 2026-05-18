import { useTranslation } from 'react-i18next';

/** Thin wrapper around react-i18next's `useTranslation`. */
export function useT(namespace?: string) {
  return useTranslation(namespace);
}
