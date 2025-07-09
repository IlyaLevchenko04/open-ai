import { Typography, TypographyAs } from '@components/Typography';

interface HeadingProps {
  title: string;
  description: string;
  titleVariant?: TypographyAs;
  className?: string;
}

export const Heading = ({
  title,
  description,
  titleVariant = 'h1',
}: HeadingProps) => (
  <div className="flex flex-col justify-center items-center gap-[16px] text-black">
    <Typography as={titleVariant} variant={700}>
      {title}
    </Typography>
    <Typography as="p" variant={500}>
      {description}
    </Typography>
  </div>
);
