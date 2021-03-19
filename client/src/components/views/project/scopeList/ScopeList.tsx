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

export default function ScopeList({ scopes, projectId }: Props) {
  const { ref, width, height } = useDimensions<HTMLDivElement>();

  return (
    <ContentContainer ref={ref}>
      <div style={{ width, height }}>
        <div className="border border-solid border-secondary rounded-md relative box-border">
          <ul className="overflow-y-auto" style={{ maxHeight: Math.floor(height * 0.7) }}>
            {scopes.map((scope) => scope && (
              <li
                key={scope.id}
                className="border-b border-solid border-blue-200 last:border-b-0"
              >
                <ScopeItem scope={scope} />
              </li>
            ))}
          </ul>
          <div className={`p-2 ${scopes.length ? 'border-t' : ''} border-solid border-blue-200`}>
            <AddScope projectId={projectId} />
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
