import {
  SVG, Svg, Path, Circle as CircleBase, G, extend, Element, List,
} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import React, { useEffect, useRef } from 'react';

type Props = {
  width?: string | number;
  height?: string | number;
  data?: (ChartItem | null)[];
}

type ChartItem = {
  id: string;
  title?: string | null;
  progress: number;
  color: string;
};

type HillSvg = {
  canvas: Svg;
  hill: Path;
  itemsGroup: G;
}

interface Circle extends CircleBase {
  setChartItem: (chartItem: ChartItem) => Circle;
  getChartItem: () => ChartItem;
}

interface CircleElement extends Element {
  chartItem: ChartItem;
}

extend(CircleBase, {
  setChartItem(chartItem: ChartItem) {
    (this as any).chartItem = chartItem;
    return this;
  },

  getChartItem(): ChartItem {
    return (this as any).chartItem;
  },
});

const VIEW_BOX = {
  x: 750,
  y: 180,
};

const DOT_DIAMETER = 10;
const PROGRESS_OFFSET = DOT_DIAMETER / 2;

let hillChartSvg: HillSvg;
export default function HillChart({ width, height, data = [] }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      hillChartSvg = createSvg(container.current);
    }
  }, [container]);

  useEffect(() => {
    const chartItems = hillChartSvg?.itemsGroup.children() as List<CircleElement>;
    if (hillChartSvg && data.length < (chartItems?.length || 0)) {
      chartItems.forEach((item) => {
        const stillExists = data.find((i) => i?.id === (item as any).chartItem.id);
        if (!stillExists) {
          item.off(); // TODO: Is this necessary?
          item.remove();
        }
      });
    } else if (hillChartSvg && data.length) {
      data.forEach((item) => {
        const existingDot = findChartItem(chartItems, item);
        if (existingDot) {
          (existingDot as any).chartItem = item;
        } else if (item) {
          addChartItem(hillChartSvg, item);
        }
      });
    }
  }, [data]);

  return (
    <div ref={container} className="relative" style={{ width, height }} />
  );
}

function createSvg(parent: HTMLDivElement): HillSvg {
  const existingCanvas = SVG('svg.hill-chart');
  if (existingCanvas) {
    existingCanvas.remove();
  }
  const canvas = SVG()
    .addTo(parent)
    .size('100%', '100%')
    .viewbox(`0 0 ${VIEW_BOX.x} ${VIEW_BOX.y}`)
    .addClass('hill-chart');
  const axis = canvas.group();
  let path = `M 0 ${VIEW_BOX.y}`;
  for (let x = 1; x < VIEW_BOX.x; x++) {
    path += ` L ${x} ${VIEW_BOX.y - hillForumula(x)}`;
  }
  const hill = axis.path(path);
  hill.fill('none').stroke({ width: 1, color: 'black' });
  return {
    canvas, hill, itemsGroup: canvas.group(),
  };
}

function addChartItem(svg: HillSvg, chartItem: ChartItem) {
  let x = VIEW_BOX.x * (chartItem.progress / 100);
  if (x > VIEW_BOX.x - PROGRESS_OFFSET) {
    x = VIEW_BOX.x - PROGRESS_OFFSET;
  } else if (x < PROGRESS_OFFSET) {
    x = PROGRESS_OFFSET;
  }
  const y = VIEW_BOX.y - hillForumula(x);
  const item = svg.itemsGroup.circle(DOT_DIAMETER) as Circle;
  item.center(x, y)
    .fill(chartItem.color)
    .setChartItem(chartItem)
    .draggable();

  item.on('dragmove.progressUpdate', (event: any) => {
    const { handler, box } = event.detail;
    event.preventDefault();
    let moveX = box.cx;
    if (box.x2 > VIEW_BOX.x) {
      moveX = VIEW_BOX.x - PROGRESS_OFFSET;
    } else if (box.x < 0) {
      moveX = PROGRESS_OFFSET;
    }
    handler.move(moveX - PROGRESS_OFFSET, VIEW_BOX.y - hillForumula(moveX) - PROGRESS_OFFSET);
  });

  return item;
}

function hillForumula(x: number) {
  // TODO: Eh, performance seems fine so far, but this function is called a TON.
  // Maybe round x values to nearest int and store cache of results in-memory?
  return -(VIEW_BOX.y / 2) * Math.sin(x * ((2 * Math.PI) / VIEW_BOX.x) - 1.5 * Math.PI) + (VIEW_BOX.y / 2);
}

function findChartItem(items: List<CircleElement>, item: ChartItem | null) {
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
