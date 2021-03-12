export function debounced(delay: number, fn: (...args: any) => any) {
  let timerId: number | null;
  return (...args: any) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export function throttled(delay: number, fn: (...args: any) => any) {
  let lastCall = 0;
  return (...args: any) => {
    const now = (new Date()).getTime();
    if (now - lastCall < delay) {
      return null;
    }
    lastCall = now;
    return fn(...args);
  };
}
