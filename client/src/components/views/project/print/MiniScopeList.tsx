import type { ReactNode } from 'react';

import tw, { styled } from 'twin.macro';

import Dot from '@/components/Dot';

import type { ProjectScope, Scopes } from '../helpers';

const ListContainer = styled.div`
  ${tw`px-6`}
  max-width: 800px;
`;

type Props = {
  title: ReactNode;
  scopes: Scopes;
  className?: string;
};

export default function MiniScopeList({ title, scopes, className = '' }: Props) {
  return (
    <ListContainer className={className}>
      <h3 className="px-2 font-bold">{title}</h3>
      <ol className="box-border rounded-md border border-solid border-secondary">
        {scopes.length < 1 && <div className="px-2 py-2 font-semibold italic">No scopes...</div>}
        {scopes.length > 0 &&
          scopes.map(
            (scope) =>
              !!scope && (
                <li
                  className="border-b border-solid border-blue-200 last:border-b-0"
                  key={scope?.id}
                >
                  <Row scope={scope} />
                </li>
              )
          )}
      </ol>
    </ListContainer>
  );
}

function Row({ scope }: { scope: ProjectScope }) {
  const { title } = scope;
  return (
    <div className="flex items-center p-2 font-semibold">
      <Dot color={scope.color} className="flex-freeze mr-2" />
      {title}
    </div>
  );
}
