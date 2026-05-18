import type { MicroAppName } from '@hstack/shared-types';

export interface MicroAppEntry {
  name: MicroAppName;
  /** Public-facing route prefix in the base shell (e.g. /portal). */
  baseRoute: string;
  /** Sub-app dev URL — placeholder values until each sub-app exists. */
  url: string;
  /** Display label in sidebar. */
  label: string;
}

export const microAppRegistry: MicroAppEntry[] = [
  {
    name: 'portal',
    baseRoute: '/portal',
    url: 'http://localhost:5174/',
    label: 'nav.portal',
  },
  {
    name: 'mock',
    baseRoute: '/mock',
    url: 'http://localhost:5175/',
    label: 'nav.mock',
  },
  {
    name: 'house-hunting',
    baseRoute: '/house-hunting',
    url: 'http://localhost:5176/',
    label: 'nav.houseHunting',
  },
  {
    name: 'component-hub',
    baseRoute: '/component-hub',
    url: 'http://localhost:5177/',
    label: 'nav.componentHub',
  },
];

export function findMicroApp(name: MicroAppName): MicroAppEntry | undefined {
  return microAppRegistry.find((entry) => entry.name === name);
}
