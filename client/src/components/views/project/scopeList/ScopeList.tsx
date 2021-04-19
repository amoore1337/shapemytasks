import React from 'react';

import useDimensions from 'react-cool-dimensions';
import tw, { styled } from 'twin.macro';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import AddScope from './AddScope';
import ScopeItem from './ScopeItem';

type Props = {
  projectId: string;
  scopes: (Scope | null)[];
}

const ContentContainer = styled.div`
  ${tw`flex-grow overflow-hidden w-full`}
  flex-basis: 1px;
  max-width: 1200px;
`;

const SCOPE_INPUT_HEIGHT = 60;

export default function ScopeList({ scopes, projectId }: Props) {
  const { ref, width, height } = useDimensions<HTMLDivElement>();

  // TODO: Yuck, need to come back to this.
  // In order for the list to take up only the exact height it needs,
  // we need to calculate the max-height based off of:
  // available container height - input component height - border of list container.
  const maxListHeight = height - SCOPE_INPUT_HEIGHT - 2;

  return (
    <ContentContainer ref={ref}>
      <div style={{ width, height }}>
        <div className="border border-solid border-secondary rounded-md relative box-border">
          <ul className="overflow-y-auto" style={{ maxHeight: maxListHeight }}>
            {scopes.map((scope) => scope && (
              <li
                key={scope.id}
                className="border-b border-solid border-blue-200 last:border-b-0"
              >
                <ScopeItem scope={scope} />
              </li>
            ))}
          </ul>
          <div
            className={`p-2 ${scopes.length ? 'border-t' : ''} border-solid border-blue-200 box-border`}
            style={{ height: SCOPE_INPUT_HEIGHT }}
          >
            <AddScope projectId={projectId} />
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
