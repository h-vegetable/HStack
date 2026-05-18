import { Button as HeroButton, type ButtonProps as HeroButtonProps } from '@heroui/react';

export type ButtonProps = HeroButtonProps;

/**
 * HStack themed button — thin wrapper around HeroUI Button.
 * Adds default size/radius alignment with HStack tokens.
 */
export function Button(props: ButtonProps) {
  return <HeroButton radius="md" size="md" {...props} />;
}
