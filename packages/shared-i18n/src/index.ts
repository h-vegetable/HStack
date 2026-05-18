import i18n, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';

export type SupportedLocale = 'zh-CN' | 'en-US';

export interface CreateI18nOptions {
  /** Default locale; defaults to zh-CN. */
  locale?: SupportedLocale;
  /** Extra resources to merge into base translations. */
  resources?: Partial<Record<SupportedLocale, Record<string, unknown>>>;
  /** Custom default namespace. */
  defaultNS?: string;
}

const baseResources: Record<SupportedLocale, Record<string, unknown>> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

/** Create a fresh i18next instance bound to React. */
export function createI18n(options: CreateI18nOptions = {}): I18nInstance {
  const { locale = 'zh-CN', resources = {}, defaultNS = 'common' } = options;
  const merged: Record<SupportedLocale, { translation: Record<string, unknown> }> = {
    'zh-CN': { translation: { ...baseResources['zh-CN'], ...(resources['zh-CN'] ?? {}) } },
    'en-US': { translation: { ...baseResources['en-US'], ...(resources['en-US'] ?? {}) } },
  };

  const instance = i18n.createInstance();
  void instance.use(initReactI18next).init({
    lng: locale,
    fallbackLng: 'zh-CN',
    defaultNS,
    interpolation: { escapeValue: false },
    resources: merged,
  });
  return instance;
}

export { default as zhCN } from './locales/zh-CN.json';
export { default as enUS } from './locales/en-US.json';
export * from './hooks';
