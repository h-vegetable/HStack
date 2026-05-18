import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layout/MainLayout';
import { MicroAppContainer } from '@/micro-app/MicroAppContainer';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'portal/*', element: <MicroAppContainer name="portal" /> },
      { path: 'mock/*', element: <MicroAppContainer name="mock" /> },
      { path: 'house-hunting/*', element: <MicroAppContainer name="house-hunting" /> },
      { path: 'component-hub/*', element: <MicroAppContainer name="component-hub" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
]);
