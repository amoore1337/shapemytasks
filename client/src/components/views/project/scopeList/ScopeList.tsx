import React, { ReactNode } from 'react';

import useDimensions from 'react-cool-dimensions';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import tw, { styled } from 'twin.macro';

import SlideOutDrawer from '@/components/SlideOutDrawer';

import { Scopes } from '../helpers';

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
  createScope?: (projectId: string, title: string, color: string) => Promise<void>;
  demoMode?: boolean;
}

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden w-full`}
  flex-basis: 1px;
  max-width: 1200px;
`;

const SCOPE_INPUT_HEIGHT = 60;

export default function ScopeList({
  scopes, projectId, dragEnabled, moveScope, openDrawer, drawerContent, drawerEnabled, createScope, demoMode,
}: Props) {
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  // TODO: Yuck, need to come back to this.
  // In order for the list to take up only the exact height it needs,
  // we need to calculate the max-height based off of:
  // available container height - input component height - border of list container.
  const maxListHeight = height - SCOPE_INPUT_HEIGHT - 2;

  const findScopeIndex = (scopeId: string) => scopes.findIndex((s) => s?.id === scopeId);

  return (
    <ContentContainer ref={observe}>
      <DndProvider backend={HTML5Backend}>
        {/* Wait until dimensions have been calculated before rendering content: */}
        {width + height > 0 && (
          <div style={{ width, height }}>
            <div className="border border-solid border-secondary rounded-md relative box-border w-full">
              <div className="flex relative">
                <ul className="overflow-y-auto flex-grow" style={{ maxHeight: maxListHeight }}>
                  {scopes.map((scope) => scope && (
                  <li
                    key={scope.id}
                    className="border-b border-solid border-blue-200 last:border-b-0"
                  >
                    <ScopeItem
                      scope={scope}
                      dragEnabled={dragEnabled}
                      findScopeIndex={findScopeIndex}
                      moveScope={moveScope}
                      disableUpdateProgress={demoMode}
                      disableActions={demoMode}
                    />
                  </li>
                  ))}
                </ul>
                {drawerEnabled && (
                  <SlideOutDrawer
                    width={240}
                    open={openDrawer}
                    className={`flex-shrink-0 border-solid border-secondary ${openDrawer ? 'border-l' : ''}`}
                  >
                    {drawerContent}
                  </SlideOutDrawer>
                )}
              </div>
              <div
                className={`p-2 ${scopes.length ? 'border-t' : ''} border-solid border-blue-200 box-border`}
                style={{ height: SCOPE_INPUT_HEIGHT }}
              >
                <AddScope projectId={projectId} createScope={createScope} />
              </div>
            </div>
          </div>
        )}
      </DndProvider>
    </ContentContainer>
  );
}
