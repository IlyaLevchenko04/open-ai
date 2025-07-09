'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'flex justify-center items-center p-[8px] w-[111px] h-[40px] rounded-[51px] text-[14px] transition cursor-pointer hover:opacity-[0.8]',
  {
    variants: {
      variant: {
        filled: 'bg-[#3B5AAE] text-white',
        outlined: 'bg-white border border-[#254699] text-[#254699]',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'filled',
      disabled: false,
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  };

export const Button = ({
  variant,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(buttonVariants({ variant, disabled, className }))}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
