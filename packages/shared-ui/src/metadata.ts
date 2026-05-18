/**
 * Component metadata catalog.
 * `apps/component-hub` consumes this to render the catalog & demo grid
 * — single source of truth, no duplicated component listings.
 */
export interface ComponentMeta {
  name: string;
  category: 'inputs' | 'feedback' | 'layout' | 'navigation' | 'data-display';
  description: string;
  /** Path to demo file relative to this package (loaded lazily by component-hub). */
  demoPath?: string;
}

export const componentCatalog: ComponentMeta[] = [
  {
    name: 'Button',
    category: 'inputs',
    description: 'HStack themed button on top of HeroUI.',
  },
];
