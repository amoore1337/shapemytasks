import React, { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import Dot from '@/components/Dot';

import { ProjectScope, Scopes } from '../helpers';

const ListContainer = styled.div`
  ${tw`px-6`}
  max-width: 800px;
`;

type Props = {
  title: ReactNode;
  scopes: Scopes;
  className?: string;
}

export default function MiniScopeList({ title, scopes, className = '' }: Props) {
  return (
    <ListContainer className={className}>
      <h3 className="px-2 font-bold">{title}</h3>
      <ol className="border border-solid border-secondary rounded-md box-border">
        {scopes.length < 1 && (
          <div className="px-2 py-2 italic font-semibold">No scopes...</div>
        )}
        {scopes.length > 0 && scopes.map((scope) => (
          !!scope && (
            <li className="border-b border-solid border-blue-200 last:border-b-0" key={scope?.id}>
              <Row scope={scope} />
            </li>
          )
        ))}
      </ol>
    </ListContainer>
  );
}

function Row({ scope }: { scope: ProjectScope }) {
  const { title } = scope;
  return (
    <div className="p-2 font-semibold flex items-center">
      <Dot color={scope.color} className="mr-2 flex-freeze" />
      {title}
    </div>
  );
}
