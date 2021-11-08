import { Project_project_scopes as ProjectScope } from '@/api/queries/types/Project';

export const PROJECT_ID = 'demo';

export type Scope = ProjectScope;

export default [
  buildScope('0', 'Sample Scope', '#00a4ff', 75),
];

function buildScope(id: string, title: string, color: string, progress: number, niceToHave = false) {
  return {
    __typename: 'Scope',
    id,
    title,
    progress,
    color,
    projectId: PROJECT_ID,
    position: 'n',
    closedAt: null,
    niceToHave,
    createdAt: new Date(),
    updatedAt: new Date(),
    flag: null,
  } as Scope;
}
