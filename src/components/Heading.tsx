import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  as?: React.ElementType; // Allow overriding the tag for semantic reasons
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  level = 1,
  className,
  as,
}) => {
  console.log("Rendering Heading:", title);
  const Tag = as || (`h${level}` as React.ElementType);

  // Doraemon theme: Font family and specific colors would be applied here via Tailwind config
  const titleStyles = {
    1: 'text-3xl md:text-4xl font-bold tracking-tight', // Doraemon: primary heading color
    2: 'text-2xl md:text-3xl font-semibold tracking-tight', // Doraemon: secondary heading color
    3: 'text-xl md:text-2xl font-semibold',
    4: 'text-lg md:text-xl font-semibold',
    5: 'text-md md:text-lg font-medium',
    6: 'text-base md:text-md font-medium',
  };

  return (
    <div className={cn("mb-4 md:mb-6", className)}>
      <Tag className={cn(titleStyles[level], 'text-neutral-800 dark:text-white')}> {/* Base text color */}
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-1 text-md text-neutral-500 dark:text-neutral-400"> {/* Doraemon: subtitle color */}
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;