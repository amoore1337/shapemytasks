import type { ReactNode } from 'react';

import useDimensions from 'react-cool-dimensions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import tw, { styled } from 'twin.macro';

import SlideOutDrawer from '@/components/SlideOutDrawer';

import type { Scopes } from '../helpers';

import AddScope from './AddScope';
import ScopeItem from './ScopeItem';

type Props = {
  projectId: string;
  scopes: Scopes;
  openDrawer: boolean;
  drawerContent: ReactNode;
  drawerEnabled: boolean;
  dragEnabled: boolean;
  moveScope: (scopeId: string, toIndex: number, moveComplete: boolean) => void;
  readonlyMode?: boolean;
  compact?: boolean;
};

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden w-full`}
  flex-basis: 1px;
  max-width: 1200px;
`;

const SCOPE_INPUT_HEIGHT = 60;

export default function ScopeList({
  scopes,
  projectId,
  dragEnabled,
  moveScope,
  openDrawer,
  drawerContent,
  drawerEnabled,
  readonlyMode,
  compact,
}: Props) {
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  // TODO: Yuck, need to come back to this.
  // In order for the list to take up only the exact height it needs,
  // we need to calculate the max-height based off of:
  // available container height - input component height - border of list container.
  const maxListHeight = height - (readonlyMode ? 0 : SCOPE_INPUT_HEIGHT) - 2;

  const findScopeIndex = (scopeId: string) => scopes.findIndex((s) => s?.id === scopeId);

  return (
    <ContentContainer ref={observe}>
      <DndProvider backend={HTML5Backend}>
        {/* Wait until dimensions have been calculated before rendering content: */}
        {width + height > 0 && (
          <div style={{ width, height }}>
            <div className="relative box-border w-full rounded-md border border-solid border-primary">
              <div className="relative flex">
                <ul className="flex-grow overflow-y-auto" style={{ maxHeight: maxListHeight }}>
                  {scopes.map(
                    (scope) =>
                      scope && (
                        <li
                          key={scope.id}
                          className="border-b border-solid border-blue-200 last:border-b-0"
                        >
                          <ScopeItem
                            scope={scope}
                            dragEnabled={dragEnabled}
                            findScopeIndex={findScopeIndex}
                            moveScope={moveScope}
                            disableUpdateProgress={readonlyMode}
                            disableActions={readonlyMode}
                            compact={compact}
                          />
                        </li>
                      )
                  )}
                </ul>
                {drawerEnabled && (
                  <SlideOutDrawer
                    width={240}
                    open={openDrawer}
                    className={`flex-shrink-0 border-solid border-primary ${
                      openDrawer ? 'border-l' : ''
                    }`}
                  >
                    {drawerContent}
                  </SlideOutDrawer>
                )}
              </div>
              {!readonlyMode && (
                <div
                  className={`p-2 ${
                    scopes.length ? 'border-t' : ''
                  } box-border border-solid border-blue-200`}
                  style={{ height: SCOPE_INPUT_HEIGHT }}
                >
                  <AddScope projectId={projectId} />
                </div>
              )}
            </div>
          </div>
        )}
      </DndProvider>
    </ContentContainer>
  );
}
