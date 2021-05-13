import { JSXElementConstructor, ReactElement } from 'react';

import {
  ConnectDragPreview, ConnectDragSource, ConnectDropTarget, useDrag, useDrop,
} from 'react-dnd';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

type MoveFn = (scopeId: string, toIndex: number) => void;
type FindFn = (scopeId: string) => number;

type DragItem = {
  scope: Scope;
  originalIndex: number;
}

type Return = [dragRef: ConnectDragSource, dropRef: ConnectDropTarget, preview: ConnectDragPreview, isDragging: boolean];

export default function useScopeDnd(
  scope: Scope,
  moveScope: MoveFn,
  findScopeIndex: FindFn,
  dragEnabled?: boolean,
): Return {
  const originalIndex = findScopeIndex(scope.id);
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'Scope',
      item: { scope, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item: DragItem, monitor) => {
        const { scope: droppedScope, originalIndex: oldIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveScope(droppedScope.id, oldIndex);
        }
      },
    }),
    [scope, originalIndex, moveScope],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'Scope',
      canDrop: () => true,
      hover({ scope: draggedScope }: DragItem) {
        if (draggedScope.id !== scope.id) {
          const overIndex = findScopeIndex(scope.id);
          moveScope(draggedScope.id, overIndex);
        }
      },
    }),
    [findScopeIndex, moveScope],
  );

  return [
    // (node: E) => drag(drop(node)),
    drag,
    drop,
    preview,
    isDragging,
  ];
}
