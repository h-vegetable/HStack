import { HeroUIProvider } from '@heroui/react';
import { AuthProvider } from '@hstack/shared-auth';
import { createI18n } from '@hstack/shared-i18n';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { useGlobalStore } from './stores/global';

const i18n = createI18n({ locale: 'zh-CN' });

export function App() {
  const locale = useGlobalStore((s) => s.locale);

  // Sync i18n locale when global store changes.
  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }

  return (
    <I18nextProvider i18n={i18n}>
      <HeroUIProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HeroUIProvider>
    </I18nextProvider>
  );
}
