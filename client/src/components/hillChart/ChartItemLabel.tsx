import React, { useEffect, useRef, useState } from 'react';

import { Circle, CircleElement } from './helpers';

type EventListener = (event: Event) => void;
export default function ChartItemLabel({ item }: { item: CircleElement }) {
  const startPos = item.node.getBoundingClientRect();
  const [pos, setPos] = useState<{ top: number, left: number }>({ top: startPos.top, left: startPos.left });
  const labelEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePosChange = (event: CustomEvent<{top: number, left: number}>) => {
      setPos(event.detail);
    };
    if (labelEl.current) {
      labelEl.current.addEventListener(`item.${item.chartItem.id}`, handlePosChange as EventListener);
    }

    return () => {
      if (labelEl.current) {
        labelEl.current.removeEventListener(`item.${item.chartItem.id}`, handlePosChange as EventListener);
      }
    };
  }, [labelEl]);

  return (
    <div
      ref={labelEl}
      id={`item.${item.chartItem.id}.label`}
      className="fixed"
      style={{
        top: pos.top - 5,
        left: pos.left + 20,
      }}
    >
      {item.chartItem.title}
    </div>
  );
}

export function updatePointLabelPos(point: Circle | CircleElement) {
  const { top, left } = point.node.getBoundingClientRect();
  const moveEvent = new CustomEvent(`item.${point.chartItem.id}`, { detail: { top, left } });
  document.getElementById(`item.${point.chartItem.id}.label`)?.dispatchEvent(moveEvent);
}
