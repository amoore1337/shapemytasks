import { useState } from 'react';

import { Project_project_scopes as ProjectScope } from '@/api/queries/types/Project';

export const PROJECT_ID = 'demo';

export type Scope = ProjectScope;

type Return = [
  scopes: Scope[],
  createScope: (projectId: string, title: string, color: string) => Promise<void>
]

export default function useDemoData(): Return {
  const [scopes, setScopes] = useState<Scope[]>([
    buildScope(PROJECT_ID, '0', 'Sample Scope', '#00a4ff'),
  ]);

  const createScope = async (projectId: string, title: string, color: string) => {
    const newId = scopes.length.toString();
    const newScope = buildScope(projectId, newId, title, color);
    setScopes((s) => [...s, newScope]);
  };

  return [scopes, createScope];
}

function buildScope(projectId: string, id: string, title: string, color: string) {
  return {
    __typename: 'Scope',
    id,
    title,
    progress: 0,
    color,
    projectId,
    position: 'n',
    closedAt: null,
    niceToHave: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    flag: null,
  } as Scope;
}
