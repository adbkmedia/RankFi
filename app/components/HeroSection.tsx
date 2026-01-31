'use client';

import FilterButton from './FilterButton';
import { FilterButtonConfig } from '../config/filterButtons';

interface HeroSectionProps {
  title: string;
  description: string;
  buttons: FilterButtonConfig[];
  activeButton?: string;
}

export default function HeroSection({
  title,
  description,
  buttons,
  activeButton,
}: HeroSectionProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/logos/RG-BG-Green-Block.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12 relative z-10">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-4">
          {title}
        </h1>

        {/* Description */}
        <p className="text-base md:text-md text-white text-center max-w-3xl mx-auto mb-6 leading-relaxed">
          {description}
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {buttons.map((button, idx) => (
            <FilterButton
              key={idx}
              label={button.label}
              emoji={button.emoji}
              href={button.href}
              isActive={activeButton === button.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
