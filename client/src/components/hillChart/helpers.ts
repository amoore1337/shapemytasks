import {
  Circle as CircleBase, Element,
} from '@svgdotjs/svg.js';

export type ChartItem = {
  id: string;
  title?: string | null;
  progress: number;
  color: string;
};

export type ViewBox = {
  x: number;
  y: number;
}

export const DEFAULT_VIEW_BOX: ViewBox = {
  x: 750,
  y: 180,
};

export interface Circle extends CircleBase {
  setChartItem: (chartItem: ChartItem) => Circle;
  chartItem: ChartItem;
}

export interface CircleElement extends Element {
  chartItem: ChartItem;
}

export function hillForumula(x: number, viewbox: ViewBox = DEFAULT_VIEW_BOX) {
  // TODO: Eh, performance seems fine so far, but this function is called a TON.
  // Maybe round x values to nearest int and store cache of results in-memory?
  return -(viewbox.y / 2) * Math.sin(x * ((2 * Math.PI) / viewbox.x) - 1.5 * Math.PI) + (viewbox.y / 2);
}

export function findChartPoint(points: CircleElement[], itemId?: string | null) {
  if (!points.length || !itemId) {
    return null;
  }

  for (let i = 0; i < points.length; i++) {
    if ((points[i] as any).chartItem?.id === itemId) {
      return points[i];
    }
  }
  return null;
}

export function getProgressFromPosition(position: number, viewbox: ViewBox = DEFAULT_VIEW_BOX) {
  let progress = (position / (viewbox.x)) * 100;
  progress = Math.min(progress, 100);
  progress = Math.max(progress, 0);

  return progress;
}
