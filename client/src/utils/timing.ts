export function debounced<A extends Array<any>>(delay: number, fn: (...args: A) => void) {
  let timerId: number | null;
  return (...args: A) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}

export function throttled<A extends Array<any>, R>(delay: number, fn: (...args: A) => R) {
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
