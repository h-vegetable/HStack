import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function MainLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto bg-neutral-100 dark:bg-neutral-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
