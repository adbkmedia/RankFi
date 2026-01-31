'use client';

import Link from 'next/link';

interface FilterButtonProps {
  label: string;
  emoji: string;
  isActive?: boolean;
  onClick?: () => void;
  href?: string;
}

export default function FilterButton({
  label,
  emoji,
  isActive = false,
  onClick,
  href,
}: FilterButtonProps) {
  const baseClasses = "px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors flex items-center gap-2 shadow-sm";
  const activeClasses = isActive
    ? "bg-[#2d2d2d] text-white"
    : "bg-white text-gray-800 hover:bg-[#2d2d2d] hover:text-white";

  const className = `${baseClasses} ${activeClasses}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <span>{emoji}</span>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
