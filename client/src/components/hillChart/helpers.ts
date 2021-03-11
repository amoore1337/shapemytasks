import {
  Circle as CircleBase, Element, List,
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

export interface Circle extends CircleBase {
  setChartItem: (chartItem: ChartItem) => Circle;
  chartItem: ChartItem;
}

export interface CircleElement extends Element {
  chartItem: ChartItem;
}

export function hillForumula(x: number, viewbox: ViewBox) {
  // TODO: Eh, performance seems fine so far, but this function is called a TON.
  // Maybe round x values to nearest int and store cache of results in-memory?
  return -(viewbox.y / 2) * Math.sin(x * ((2 * Math.PI) / viewbox.x) - 1.5 * Math.PI) + (viewbox.y / 2);
}

export function findChartItem(items: List<CircleElement>, item: ChartItem | null) {
  if (!items.length || !item) {
    return null;
  }

  for (let i = 0; i < items.length; i++) {
    if ((items[i] as any).chartItem?.id === item.id) {
      return items[i];
    }
  }
  return null;
}
