import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { Typography } from '@components/Typography';

interface IconTextButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const IconTextButton = ({
  icon,
  label,
  onClick,
  className,
}: IconTextButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex flex-col w-full items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white shadow-sm hover:shadow-md transition hover:bg-gray-50 text-gray-700 cursor-pointer',
        className
      )}
    >
      <div className="text-2xl">{icon}</div>
      <Typography as="span" className="text-sm font-medium" variant={500}>
        {label}
      </Typography>
    </button>
  );
};
