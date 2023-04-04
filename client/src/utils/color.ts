import { Color } from '@svgdotjs/svg.js';

export function getRandomColor() {
  return (Color as any).random().toHex();
}
