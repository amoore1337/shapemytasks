import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@material-ui/core';
import {
  SVG, Svg, Path, Circle as CircleBase, G, extend,
} from '@svgdotjs/svg.js';

import '@svgdotjs/svg.draggable.js';
import { colors } from '@/constants';
import { debounced } from '@/utils/timing';

import ChartPointLabel, { updatePointLabelPos } from './ChartPointLabel';
import {
  ChartItem, Circle, CircleElement, findChartPoint, getProgressFromPosition, hillForumula, DEFAULT_VIEW_BOX,
} from './helpers';

type Props = {
  width?: string | number;
  height?: string | number;
  data?: (ChartItem | null)[];
  allowEdit?: boolean;
  onSave?: (updatedItems: UpdatedItemsMap) => void;
  onCancel?: () => void;
}

type HillSvg = {
  canvas: Svg;
  hill: Path;
  pointsGroup: G;
}

export type UpdatedItemsMap = {
  [id: string]: number;
};

extend(CircleBase, {
  setChartItem(chartItem: ChartItem) {
    (this as any).chartItem = chartItem;
    return this;
  },
});

const VIEW_BOX = DEFAULT_VIEW_BOX;

const DOT_DIAMETER = 10;
const DOT_RADIUS = DOT_DIAMETER / 2;

let hillChartSvg: HillSvg;
let updatedItems: UpdatedItemsMap = {};
export default function HillChart({
  width, height, allowEdit, onSave, onCancel, data = [],
}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [plottedItems, setPlottedItems] = useState<string[]>([]);

  const plotPoints = () => {
    const circles = currentChartPoints();
    const items: string[] = [];

    // Remove any points that were deleted:
    if (hillChartSvg && data.length < circles.length) {
      circles.forEach((point) => {
        const stillExists = data.find((i) => i?.id === point.chartItem.id);
        if (!stillExists) {
          point.off(); // TODO: Is this necessary?
          point.remove();
        }
      });
    }

    // Update/create points from data:
    if (hillChartSvg && data.length) {
      data.forEach((item) => {
        let plot = findChartPoint(circles, item?.id);
        if (plot && item) {
          plot.chartItem = item;
        } else if (item) {
          plot = addChartPoint(hillChartSvg, item, allowEdit);
        }
        if (plot) {
          items.push(plot?.chartItem.id);
        }
      });
    }

    setPlottedItems(items);
  };

  const handleSave = () => {
    if (!onSave || !Object.keys(updatedItems).length) { return; }
    onSave(updatedItems);
  };

  const handleCancel = () => {
    Object.keys(updatedItems).forEach((itemId) => {
      const point = findChartPoint(currentChartPoints(), itemId);
      if (point) { point.remove(); }
    });

    plotPoints();
    if (onCancel) { onCancel(); }
  };

  useEffect(() => {
    if (container.current) {
      hillChartSvg = createSvg(container.current);
    }
  }, [container]);

  useEffect(() => {
    plotPoints();
  }, [data]);

  // Fix labels on window resize:
  useEffect(() => {
    const updateAllLabelPos = () => plottedItems.forEach((itemId) => {
      const point = findChartPoint(currentChartPoints(), itemId);
      if (point) {
        updatePointLabelPos(point);
      }
    });

    window.addEventListener('resize', debounced(500, updateAllLabelPos));
    return () => window.removeEventListener('resize', updateAllLabelPos);
  }, [plottedItems]);

  useEffect(() => {
    const points = currentChartPoints();
    if (allowEdit) {
      points.forEach((point) => enableDragForPoint(point));
    } else {
      points.forEach((point) => disableDragForPoint(point));
      updatedItems = {};
    }
  }, [allowEdit]);

  return (
    <div ref={container} className="relative" style={{ width, height }}>
      {plottedItems.map((itemId) => {
        const point = findChartPoint(currentChartPoints(), itemId);
        return point && <ChartPointLabel key={itemId} point={point} dragEnabled={allowEdit} />;
      })}
      {allowEdit && (
        <div className="absolute top-2 right-2 flex">
          <Button className="mr-2" variant="outlined" onClick={handleCancel}>Cancel</Button>
          <Button className="text-white" variant="contained" color="secondary" onClick={handleSave}>Save</Button>
        </div>
      )}
    </div>
  );
}

function currentChartPoints() {
  return (hillChartSvg?.pointsGroup.children().toArray() || []) as CircleElement[];
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
    path += ` L ${x} ${VIEW_BOX.y - hillForumula(x)}`;
  }
  const hill = axis.path(path);
  hill.fill('none').stroke({ width: 1, color: colors.gray['700'] });

  return {
    canvas, hill, pointsGroup: canvas.group(),
  };
}

function addChartPoint(svg: HillSvg, chartItem: ChartItem, enableDrag?: boolean) {
  let x = VIEW_BOX.x * (chartItem.progress / 100);
  if (x > VIEW_BOX.x - DOT_RADIUS) {
    x = VIEW_BOX.x - DOT_RADIUS;
  } else if (x < DOT_RADIUS) {
    x = DOT_RADIUS;
  }
  const y = VIEW_BOX.y - hillForumula(x);
  const point = svg.pointsGroup.circle(DOT_DIAMETER) as Circle;
  point.center(x, y)
    .fill(chartItem.color)
    .setChartItem(chartItem)
    .draggable();

  if (enableDrag) {
    enableDragForPoint(point);
  } else {
    point.on('beforedrag.disabled', (event: any) => {
      event.preventDefault();
    });
  }

  updatePointLabelPos(point);
  return point;
}

function disableDragForPoint(point: Circle | CircleElement) {
  point.off('beforedrag.disabled');
  point.off('dragmove.progressUpdate');
  point.toggleClass('cursor-move');
  point.on('beforedrag.disabled', (event: any) => {
    event.preventDefault();
  });
}

function enableDragForPoint(point: Circle | CircleElement) {
  point.off('beforedrag.disabled');
  point.off('dragmove.progressUpdate');

  point.toggleClass('cursor-move');
  point.on('dragmove.progressUpdate', (event: any) => {
    const { handler, box } = event.detail;
    event.preventDefault();
    let moveX = box.cx;
    if (box.x2 > VIEW_BOX.x) {
      moveX = VIEW_BOX.x - DOT_RADIUS;
    } else if (box.x < 0) {
      moveX = DOT_RADIUS;
    }

    updatedItems[point.chartItem.id] = getProgressFromPosition(box.cx);
    handler.move(moveX - DOT_RADIUS, VIEW_BOX.y - hillForumula(moveX, VIEW_BOX) - DOT_RADIUS);
    updatePointLabelPos(point);
  });
}
