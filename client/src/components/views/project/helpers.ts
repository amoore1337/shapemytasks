import { gql } from '@apollo/client';

import { ProjectPage_project_scopes as ProjectPageProjectScopes } from './types/ProjectPage';

export const SCOPE_FRAGMENT = gql`
  fragment ScopeFragment on Scope {
    id
    title
    progress
    color
    projectId
    position
    closedAt
    createdAt
    updatedAt
  }
`;

export type ProjectScope = ProjectPageProjectScopes;
export type Scopes = (ProjectScope | null)[];

export type SortOption = {
  label: string;
  value: string;
  sort: (scopes: Scopes) => Scopes;
  allowDrag: boolean;
}

export function findScopeIndex(scopes: Scopes, scopeId: string) {
  return scopes.findIndex((s) => s?.id === scopeId);
}

export function moveArrayItem<I>(arr: I[], fromIndex: number, toIndex: number) {
  const item = arr[fromIndex];
  if (!item) { return arr; }
  const arrCopy = [...arr];
  arrCopy.splice(fromIndex, 1);
  arrCopy.splice(toIndex, 0, item);
  return arrCopy;
}

export const SCOPE_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Position',
    value: 'position',
    sort: sortScopesByPosition,
    allowDrag: true,
  },
  {
    label: 'Created At',
    value: 'id',
    sort: sortScopesById,
    allowDrag: false,
  },
  {
    label: 'Progress (Low to High)',
    value: 'progress_asc',
    sort: sortScopesByProgressAsc,
    allowDrag: false,
  },
  {
    label: 'Progress (High to Low)',
    value: 'progress_desc',
    sort: sortScopesByProgressDesc,
    allowDrag: false,
  },
  {
    label: 'Title',
    value: 'title',
    sort: sortScopesByTitle,
    allowDrag: false,
  },
];

export function sortScopesByPosition(scopes: Scopes) {
  return [...scopes].sort((a, b) => {
    let result = compareStringAlphabetically(a?.position, b?.position);
    if (result === 0) {
      result = compareStringNumerically(a?.id, b?.id);
    }
    return result;
  });
}

export function sortScopesById(scopes: Scopes) {
  return [...scopes].sort((a, b) => compareStringNumerically(a?.id, b?.id));
}

export function sortScopesByUpdatedAt(scopes: Scopes) {
  return [...scopes].sort((a, b) => (b?.updatedAt || 0) - (a?.updatedAt || 0));
}

export function sortScopesByClosedAt(scopes: Scopes) {
  return [...scopes].sort((a, b) => (b?.closedAt || 0) - (a?.closedAt || 0));
}

export function sortScopesByProgressAsc(scopes: Scopes) {
  return [...scopes].sort((a, b) => {
    const aProgress = a?.progress || 0;
    const bProgress = b?.progress || 0;
    if (aProgress !== bProgress) { return aProgress - bProgress; }

    return compareStringAlphabetically(a?.title, b?.title);
  });
}

export function sortScopesByProgressDesc(scopes: Scopes) {
  return [...scopes].sort((a, b) => {
    const aProgress = a?.progress || 0;
    const bProgress = b?.progress || 0;
    if (aProgress !== bProgress) { return bProgress - aProgress; }

    return compareStringAlphabetically(a?.title, b?.title);
  });
}

export function sortScopesByTitle(scopes: Scopes) {
  return [...scopes].sort((a, b) => compareStringAlphabetically(a?.title, b?.title));
}

function compareStringAlphabetically(a?: string | null, b?: string | null) {
  const safeA = a || '';
  const safeB = b || '';
  if (safeA < safeB) { return -1; }
  if (safeA > safeB) { return 1; }
  return 0;
}

function compareStringNumerically(a?: string | null, b?: string | null) {
  const safeA = a || '0';
  const safeB = b || '0';
  return (parseInt(safeA, 10) || 0) - (parseInt(safeB, 10) || 0);
}
