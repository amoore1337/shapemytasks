import { FocusEventHandler, FocusEvent, useCallback } from 'react';

export default function useOnChildBlur(onBlur: (event: FocusEvent<HTMLElement>) => void) {
  const handleBlur: FocusEventHandler<HTMLElement> = useCallback((event) => {
    const { currentTarget } = event;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        onBlur(event);
      }
    });
  }, [onBlur]);

  return handleBlur;
}
