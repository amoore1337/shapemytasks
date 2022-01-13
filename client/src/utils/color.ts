import { Color } from '@svgdotjs/svg.js';

// eslint-disable-next-line import/prefer-default-export
export function getRandomColor() {
  return (Color as any).random().toHex();
}
