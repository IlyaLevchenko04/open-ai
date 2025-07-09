// components/Typography.tsx
import { cva, VariantProps } from 'class-variance-authority';

import React from 'react';
import { twMerge } from 'tailwind-merge';

const typographyVariants = cva('text-base', {
  variants: {
    variant: {
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
    },
    as: {
      h1: 'text-3xl sm:text-4xl lg:text-5xl',
      h2: 'text-2xl sm:text-3xl',
      h3: 'text-xl sm:text-2xl',
      p: 'text-base sm:text-lg',
      span: '',
    },
  },
  defaultVariants: {
    variant: 400,
    as: 'p',
  },
});

export type TypographyAs = 'h1' | 'h2' | 'h3' | 'p' | 'span';

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: TypographyAs;
    children: React.ReactNode;
  };

export const Typography = ({
  as = 'p',
  variant = 400,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Component = as;

  return (
    <Component
      className={twMerge(typographyVariants({ variant, as, className }))}
      {...props}
    >
      {children}
    </Component>
  );
};
