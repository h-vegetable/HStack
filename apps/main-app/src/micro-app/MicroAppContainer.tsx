import { useAuthStore } from '@hstack/shared-auth';
import type { MicroAppName } from '@hstack/shared-types';
import { useMemo } from 'react';

import { findMicroApp } from './registry';

import { useGlobalStore } from '@/stores/global';

export interface MicroAppContainerProps {
  name: MicroAppName;
}

/**
 * Renders a `<micro-app>` element bound to a registry entry.
 * Passes auth + theme + locale down via the `data` attribute.
 */
export function MicroAppContainer({ name }: MicroAppContainerProps) {
  const entry = findMicroApp(name);
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const theme = useGlobalStore((s) => s.theme);
  const locale = useGlobalStore((s) => s.locale);

  const data = useMemo(() => ({ user, token, theme, locale }), [user, token, theme, locale]);

  if (!entry) {
    return <div className="p-8 text-red-500">Unknown micro-app: {name}</div>;
  }

  return (
    <div className="h-full w-full">
      <micro-app
        name={entry.name}
        url={entry.url}
        baseroute={entry.baseRoute}
        keep-alive
        data={data}
      />
    </div>
  );
}
