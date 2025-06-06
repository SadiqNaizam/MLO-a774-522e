import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  as?: React.ElementType;
}

const Heading: React.FC<HeadingProps> = ({\
  title,\
  subtitle,\
  level = 1,\
  className,\
  as,\
}) => {\
  console.log("Rendering Heading:", title);\
  const Tag = as || (`h${level}` as React.ElementType);

  const titleStyles = {\
    1: 'text-3xl md:text-4xl font-bold tracking-tight',\
    2: 'text-2xl md:text-3xl font-semibold tracking-tight',\
    3: 'text-xl md:text-2xl font-semibold',\
    4: 'text-lg md:text-xl font-semibold',\
    5: 'text-md md:text-lg font-medium',\
    6: 'text-base md:text-md font-medium',\
  };\

  return (
    <div className={cn("mb-4 md:mb-6", className)}>
      <Tag className={cn(titleStyles[level], 'text-foreground dark:text-white')}>
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-1 text-md text-muted-foreground dark:text-neutral-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};\n\nexport default Heading;