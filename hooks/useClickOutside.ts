import { useEffect, RefObject } from 'react';

/**
 * Hook that detects clicks outside of the specified element(s)
 * and calls the handler when a click outside is detected.
 *
 * @param refs - Single ref or array of refs to monitor
 * @param handler - Callback function when click outside is detected
 * @param enabled - Optional boolean to enable/disable the listener (default: true)
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  handler: () => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      // Check if click is outside all refs
      const isOutside = refsArray.every(ref => {
        return ref.current && !ref.current.contains(event.target as Node);
      });

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, handler, enabled]);
}
