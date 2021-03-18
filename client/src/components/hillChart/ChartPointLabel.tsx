import React, { useEffect, useRef, useState } from 'react';

import { Circle, CircleElement } from './helpers';

type EventListener = (event: Event) => void;
export default function ChartPointLabel({ point, dragEnabled }: { point: CircleElement, dragEnabled?: boolean }) {
  const startPos = point.node.getBoundingClientRect();
  const [pos, setPos] = useState<{ top: number, left: number }>({ top: startPos.top, left: startPos.left });
  const labelEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosChange = (event: CustomEvent<{top: number, left: number}>) => {
      setPos(event.detail);
    };
    const redirectMouseEvent = (event: Event) => {
      point.dispatchEvent(new MouseEvent(event.type, event));
    };
    if (labelEl.current) {
      labelEl.current.addEventListener(`item.${point.chartItem.id}`, handlePosChange as EventListener);
      if (dragEnabled) {
        labelEl.current.addEventListener('mousedown', redirectMouseEvent);
      }
    }

    return () => {
      if (labelEl.current) {
        labelEl.current.removeEventListener(`item.${point.chartItem.id}`, handlePosChange as EventListener);
        labelEl.current.removeEventListener('mousedown', redirectMouseEvent);
      }
    };
  }, [labelEl, dragEnabled]);

  return (
    <div
      ref={labelEl}
      id={`item.${point.chartItem.id}.label`}
      className={`fixed ${dragEnabled ? 'cursor-move' : ''}`}
      style={{
        top: pos.top - 5,
        left: pos.left + 20,
      }}
    >
      {point.chartItem.title}
    </div>
  );
}

export function updatePointLabelPos(point: Circle | CircleElement) {
  const { top, left } = point.node.getBoundingClientRect();
  const moveEvent = new CustomEvent(`item.${point.chartItem.id}`, { detail: { top, left } });
  document.getElementById(`item.${point.chartItem.id}.label`)?.dispatchEvent(moveEvent);
}
