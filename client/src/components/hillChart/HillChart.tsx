import {
  SVG, Svg, Path, Circle as CircleBase, G, extend, List, Color,
} from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../constants';
import ChartItemLabel, { updateItemLabelPos } from './ChartItemLabel';
import {
  ChartItem, Circle, CircleElement, findChartItem, hillForumula, ViewBox,
} from './helpers';

type Props = {
  width?: string | number;
  height?: string | number;
  data?: (ChartItem | null)[];
}

type HillSvg = {
  canvas: Svg;
  hill: Path;
  itemsGroup: G;
}

extend(CircleBase, {
  setChartItem(chartItem: ChartItem) {
    (this as any).chartItem = chartItem;
    return this;
  },
});

const VIEW_BOX: ViewBox = {
  x: 750,
  y: 180,
};

const DOT_DIAMETER = 10;
const DOT_RADIUS = DOT_DIAMETER / 2;

let hillChartSvg: HillSvg;
export default function HillChart({ width, height, data = [] }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [chartItems, setChartItems] = useState<Circle[]>([]);

  useEffect(() => {
    if (container.current) {
      hillChartSvg = createSvg(container.current);
    }
  }, [container]);

  useEffect(() => {
    const circles = hillChartSvg?.itemsGroup.children() as List<CircleElement>;
    if (hillChartSvg && data.length < (circles?.length || 0)) {
      circles.forEach((item) => {
        const stillExists = data.find((i) => i?.id === item.chartItem.id);
        if (!stillExists) {
          item.off(); // TODO: Is this necessary?
          item.remove();
          setChartItems([...chartItems.filter((i) => i.chartItem.id === item.chartItem.id)]);
        }
      });
    } else if (hillChartSvg && data.length) {
      data.forEach((item) => {
        const existingDot = findChartItem(circles, item);
        if (existingDot) {
          (existingDot as any).chartItem = item;
        } else if (item) {
          const newChartItem = addChartItem(hillChartSvg, item);
          if (!chartItems.find((i) => i.chartItem.id === newChartItem.chartItem.id)) {
            setChartItems((existingItems) => [...existingItems, newChartItem]);
          }
        }
      });
    }
  }, [data]);

  return (
    <div ref={container} className="relative" style={{ width, height }}>
      {chartItems && chartItems.map((item) => item && <ChartItemLabel key={item.chartItem.id} item={item} />)}
    </div>
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

  const axisStroke = { width: 1, color: colors.gray['100'], dasharray: '4 1' };
  axis.line(VIEW_BOX.x / 2, 0, VIEW_BOX.x / 2, VIEW_BOX.y).stroke(axisStroke);
  axis.line(0, VIEW_BOX.y, VIEW_BOX.x, VIEW_BOX.y).stroke(axisStroke);

  const labelAttrs = {
    'alignment-baseline': 'middle',
    'text-anchor': 'middle',
    class: 'text-xs',
  };
  const axisLabels = canvas.group().attr({ transform: `translate(0, ${VIEW_BOX.y})` });
  axisLabels.text('Figuring things out').attr({ ...labelAttrs, x: VIEW_BOX.x / 4, y: 0 });
  axisLabels.text('Making it happen').attr({ ...labelAttrs, x: VIEW_BOX.x * (3 / 4), y: 0 });

  let path = `M 0 ${VIEW_BOX.y}`;
  for (let x = 1; x < VIEW_BOX.x; x++) {
    path += ` L ${x} ${VIEW_BOX.y - hillForumula(x, VIEW_BOX)}`;
  }
  const hill = axis.path(path);
  hill.fill('none').stroke({ width: 1, color: colors.gray['700'] });

  return {
    canvas, hill, itemsGroup: canvas.group(),
  };
}

function addChartItem(svg: HillSvg, chartItem: ChartItem) {
  let x = VIEW_BOX.x * (chartItem.progress / 100);
  if (x > VIEW_BOX.x - DOT_RADIUS) {
    x = VIEW_BOX.x - DOT_RADIUS;
  } else if (x < DOT_RADIUS) {
    x = DOT_RADIUS;
  }
  const y = VIEW_BOX.y - hillForumula(x, VIEW_BOX);
  const item = svg.itemsGroup.circle(DOT_DIAMETER) as Circle;
  item.center(x, y)
    // .fill((Color as any).random())
    .fill(chartItem.color)
    .setChartItem(chartItem)
    .draggable();

  item.on('dragmove.progressUpdate', (event: any) => {
    const { handler, box } = event.detail;
    event.preventDefault();
    let moveX = box.cx;
    if (box.x2 > VIEW_BOX.x) {
      moveX = VIEW_BOX.x - DOT_RADIUS;
    } else if (box.x < 0) {
      moveX = DOT_RADIUS;
    }
    handler.move(moveX - DOT_RADIUS, VIEW_BOX.y - hillForumula(moveX, VIEW_BOX) - DOT_RADIUS);
    updateItemLabelPos(item);
  });

  updateItemLabelPos(item);
  return item;
}
