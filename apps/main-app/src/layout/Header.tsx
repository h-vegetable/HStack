import { Button } from '@heroui/react';
import { useAuth } from '@hstack/shared-auth';
import { useT } from '@hstack/shared-i18n';

import { useGlobalStore } from '@/stores/global';

export function Header() {
  const { user, signOut } = useAuth();
  const toggleSidebar = useGlobalStore((s) => s.toggleSidebar);
  const theme = useGlobalStore((s) => s.theme);
  const setTheme = useGlobalStore((s) => s.setTheme);
  const locale = useGlobalStore((s) => s.locale);
  const setLocale = useGlobalStore((s) => s.setLocale);
  const { t } = useT();

  return (
    <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="light" onPress={toggleSidebar}>
          ☰
        </Button>
        <span className="text-lg font-semibold">HStack</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="flat"
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '🌙' : '☀'}
        </Button>
        <Button
          size="sm"
          variant="flat"
          onPress={() => setLocale(locale === 'zh-CN' ? 'en-US' : 'zh-CN')}
        >
          {locale === 'zh-CN' ? '中' : 'EN'}
        </Button>
        {user ? (
          <>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">{user.username}</span>
            <Button size="sm" color="primary" variant="flat" onPress={signOut}>
              {t('nav.logout')}
            </Button>
          </>
        ) : (
          <span className="text-sm text-neutral-500">{t('nav.login')}</span>
        )}
      </div>
    </header>
  );
}
