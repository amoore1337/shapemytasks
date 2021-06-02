import React, { useEffect, useRef, useState } from 'react';

import tw, { styled, css } from 'twin.macro';

import {
  Circle, CircleElement, getProgressFromPosition, ViewBox,
} from './helpers';

const LABEL_HEIGHT = 24;

const StyledLabel = styled.div`
  max-width: 400px;
  height: ${LABEL_HEIGHT}px;
  ${tw`overflow-hidden overflow-ellipsis whitespace-nowrap px-1`}
  
  ${({ $printMode }: { $printMode?: boolean }) => $printMode && css`
    ${tw`whitespace-normal overflow-auto rounded bg-white z-10 shadow`}
    height: auto;
  `}

  &:hover {
    ${tw`whitespace-normal overflow-auto rounded bg-white z-10 shadow`}
    height: auto;
  }
`;

type Props = { point: CircleElement, dragEnabled?: boolean, printMode?: boolean };

type EventListener = (event: Event) => void;
type Position = { top: number, left: number, bottom: number, right: number, progress: number };
export default function ChartPointLabel({ point, dragEnabled, printMode }: Props) {
  const startPos = point.node.getBoundingClientRect();
  const [pos, setPos] = useState<Position>(getStartPosition(startPos, point));
  const [labelStyle, setLabelStyle] = useState<React.CSSProperties>({
    top: startPos.top - 5,
    left: startPos.left + 20,
  });
  const labelEl = useRef<HTMLDivElement>(null);

  // Bleh, the start position isn't always initialized to real values at first.
  // TODO: Investigate this more...
  useEffect(() => {
    setPos(getStartPosition(startPos, point));
  }, [startPos.top, startPos.bottom, startPos.left, startPos.right]);

  useEffect(() => {
    const handlePosChange = ({ detail: { ...newPos } }: CustomEvent<Position>) => {
      setPos(newPos);
    };
    const redirectMouseEvent = (event: Event) => {
      point.dispatchEvent(new MouseEvent(event.type, event));
    };
    if (labelEl.current) {
      labelEl.current.addEventListener(`${point.chart}.item.${point.chartItem.id}`, handlePosChange as EventListener);
      if (dragEnabled) {
        labelEl.current.addEventListener('mousedown', redirectMouseEvent);
      }
    }

    return () => {
      if (labelEl.current) {
        labelEl.current.removeEventListener(`${point.chart}.item.${point.chartItem.id}`, handlePosChange as EventListener);
        labelEl.current.removeEventListener('mousedown', redirectMouseEvent);
      }
    };
  }, [labelEl, dragEnabled]);

  useEffect(() => {
    const pointDiameter = Math.abs(pos.right - pos.left);
    const midHeight = pos.bottom - (pointDiameter / 2);
    const top = midHeight - (LABEL_HEIGHT / 2);
    const style: React.CSSProperties = { top };

    if (pos.progress < 51) {
      style.left = pos.right + 5;
    } else {
      style.left = pos.left - (labelEl.current?.clientWidth || 0) - 5;
    }

    setLabelStyle(style);
  }, [labelEl, pos]);

  const inProgress = Math.floor(pos.progress) > 0 && Math.ceil(pos.progress) < 100;
  return (
    <StyledLabel
      ref={labelEl}
      id={`${point.chart}.item.${point.chartItem.id}.label`}
      className={`fixed ${dragEnabled ? 'cursor-move' : ''} ${inProgress ? 'text-gray-800' : 'text-gray-300'}`}
      style={labelStyle}
      $printMode={printMode}
    >
      {point.chartItem.title}
    </StyledLabel>
  );
}

function chartPositionForPoint(point: Circle | CircleElement) {
  return parseInt(point.node.getAttribute('cx') || '0', 10);
}

export function updatePointLabelPos(point: Circle | CircleElement, viewbox: ViewBox) {
  const {
    top, left, bottom, right,
  } = point.node.getBoundingClientRect();
  const chartPos = chartPositionForPoint(point);
  const moveEvent = new CustomEvent(`${point.chart}.item.${point.chartItem.id}`, {
    detail: {
      top,
      left,
      bottom,
      right,
      progress: getProgressFromPosition(chartPos, viewbox),
    },
  });
  document.getElementById(`${point.chart}.item.${point.chartItem.id}.label`)?.dispatchEvent(moveEvent);
}

function getStartPosition(startPos: DOMRect, point: CircleElement) {
  // document.elementsFromPoint(x, y).map((e) => e.id).filter(/* *.item.*.label */)
  // ^ check for 3 points: top edge, bottom edge, middle
  // if any elements already exist, dodge somehow
  return {
    top: startPos.top,
    left: startPos.left,
    bottom: startPos.bottom,
    right: startPos.right,
    progress: getProgressFromPosition(chartPositionForPoint(point)),
  };
}
