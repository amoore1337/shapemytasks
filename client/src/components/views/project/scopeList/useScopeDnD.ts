import {
  ConnectDragPreview, ConnectDragSource, ConnectDropTarget, useDrag, useDrop,
} from 'react-dnd';

import { ProjectScope } from '../helpers';

type MoveFn = (scopeId: string, toIndex: number, moveComplete: boolean) => void;
type FindFn = (scopeId: string) => number;

type DragItem = {
  scope: ProjectScope;
  originalIndex: number;
}

type Return = [dragRef: ConnectDragSource, dropRef: ConnectDropTarget, preview: ConnectDragPreview, isDragging: boolean];

export default function useScopeDnd(
  scope: ProjectScope,
  moveScope: MoveFn,
  findScopeIndex: FindFn,
  dragEnabled: boolean,
): Return {
  const originalIndex = findScopeIndex(scope.id);
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'Scope',
      item: { scope, originalIndex },
      canDrag: () => dragEnabled,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item: DragItem, monitor) => {
        const { scope: droppedScope, originalIndex: oldIndex } = item;
        const newIndex = findScopeIndex(scope.id);
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveScope(droppedScope.id, oldIndex, didDrop);
        } else if (didDrop && oldIndex !== newIndex) {
          moveScope(droppedScope.id, newIndex, didDrop);
        }
      },
    }),
    [scope, originalIndex, moveScope],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'Scope',
      canDrop: () => dragEnabled,
      hover({ scope: draggedScope }: DragItem, monitor) {
        if (draggedScope.id !== scope.id) {
          const overIndex = findScopeIndex(scope.id);
          moveScope(draggedScope.id, overIndex, monitor.didDrop());
        }
      },
    }),
    [findScopeIndex, moveScope],
  );

  return [
    drag,
    drop,
    preview,
    isDragging,
  ];
}
