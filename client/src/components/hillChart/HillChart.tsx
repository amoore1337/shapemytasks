import { SVG, Svg, Path } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.draggable.js';
import React, { useEffect, useRef } from 'react';
import hillPath from './hillPath';

type Props = {
  width?: string | number;
  height?: string | number;
}

type HillSvg = {
  canvas: Svg;
  hill: Path;
}

let hillChartSvg: HillSvg;
export default function HillChart({ width, height }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      hillChartSvg = addSvg(container.current);
      addScopeProgress(hillChartSvg);
    }
  }, [container]);
  return (
    <div ref={container} className="relative" style={{ width, height }} />
  );
}

function addSvg(parent: HTMLDivElement) {
  const existingCanvas = SVG('svg.hill-chart');
  if (existingCanvas) {
    existingCanvas.remove();
  }
  const canvas = SVG()
    .addTo(parent)
    .size('100%', '100%')
    .viewbox('0 0 750 185')
    .addClass('hill-chart');
  const axis = canvas.group();
  const hill = axis.path(hillPath);
  console.log('length? ', hill.length());
  hill.fill('none').stroke({ width: 1, color: 'black' });
  return { canvas, hill };
}

const DOT_DIAMETER = 10;
const PROGRESS_OFFSET = DOT_DIAMETER / 2;
function addScopeProgress(svg: HillSvg) {
  const chartLength = svg.hill.length() - DOT_DIAMETER;
  const { x, y } = svg.hill.pointAt(75 * (chartLength / 100) + PROGRESS_OFFSET);
  const scopes = svg.canvas.group();
  const scope = scopes.circle(10).center(x, y).fill('#f06').draggable();
  scope.on('dragmove.progressUpdate', (event: any) => {
    const { handler, box } = event.detail;
    event.preventDefault();
    const locRatio = box.cx / 750;
    const newPos = svg.hill.pointAt(svg.hill.length() * locRatio);
    console.log(svg.hill.array());
    handler.move(newPos.x - PROGRESS_OFFSET, newPos.y - PROGRESS_OFFSET);
  });
}
