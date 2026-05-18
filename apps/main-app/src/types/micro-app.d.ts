import type { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'micro-app': DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          name: string;
          url: string;
          baseroute?: string;
          iframe?: boolean;
          inline?: boolean;
          'disable-scopecss'?: boolean;
          'disable-sandbox'?: boolean;
          'keep-alive'?: boolean;
          data?: unknown;
        },
        HTMLElement
      >;
    }
  }
}

export {};
