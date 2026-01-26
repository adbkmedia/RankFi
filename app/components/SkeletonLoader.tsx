'use client';

interface SkeletonLoaderProps {
  rows?: number;
  columns?: number;
}

export default function SkeletonLoader({ rows = 10, columns = 12 }: SkeletonLoaderProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="skeleton-row bg-white border-b border-[#eaeaea]">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-2 py-2 border border-[#eaeaea]">
              <div className="skeleton-loader" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
