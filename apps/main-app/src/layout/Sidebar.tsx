import { useT } from '@hstack/shared-i18n';
import { NavLink } from 'react-router-dom';

import { microAppRegistry } from '@/micro-app/registry';
import { useGlobalStore } from '@/stores/global';

export function Sidebar() {
  const collapsed = useGlobalStore((s) => s.sidebarCollapsed);
  const { t } = useT();

  return (
    <aside
      className={`shrink-0 border-r border-neutral-200 bg-neutral-50 transition-[width] duration-200 dark:border-neutral-800 dark:bg-neutral-950 ${
        collapsed ? 'w-14' : 'w-56'
      }`}
    >
      <nav className="flex flex-col gap-1 p-2">
        <NavItem to="/" label={t('nav.home')} icon="⌂" collapsed={collapsed} />
        {microAppRegistry.map((entry) => (
          <NavItem
            key={entry.name}
            to={entry.baseRoute}
            label={t(entry.label)}
            icon="◆"
            collapsed={collapsed}
          />
        ))}
      </nav>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon: string;
  collapsed: boolean;
}

function NavItem({ to, label, icon, collapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200'
            : 'text-neutral-700 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-800'
        }`
      }
    >
      <span className="w-4 text-center">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  );
}
