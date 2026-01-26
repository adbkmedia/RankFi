import { useState, useEffect, RefObject } from 'react';

/**
 * Hook to detect horizontal scroll state of a container.
 * Returns true when the container can scroll horizontally AND has been scrolled.
 * Used for showing shadow effects on sticky columns.
 * 
 * @param containerRef - Reference to the scrollable container element
 * @returns boolean indicating if horizontal scroll is active
 */
export function useHorizontalScroll(containerRef: RefObject<HTMLDivElement | null>): boolean {
  const [canScrollHorizontally, setCanScrollHorizontally] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScrollState = () => {
      const canScroll = container.scrollWidth > container.clientWidth;
      const isScrolled = container.scrollLeft > 0;
      setCanScrollHorizontally(canScroll && isScrolled);
    };

    // Check on scroll
    container.addEventListener('scroll', checkScrollState);
    // Check on resize
    window.addEventListener('resize', checkScrollState);
    // Initial check
    checkScrollState();

    return () => {
      container.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [containerRef]);

  return canScrollHorizontally;
}

export default useHorizontalScroll;
