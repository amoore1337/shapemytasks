import { ProjectPage_project_scopes as ProjectScopes } from './types/ProjectPage';

export type Scopes = (ProjectScopes | null)[];

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

function sortScopesByPosition(scopes: Scopes) {
  return [...scopes].sort();
}

function sortScopesById(scopes: Scopes) {
  return [...scopes].sort((a, b) => (parseInt(a!.id, 10) || 0) - (parseInt(b!.id, 10) || 0));
}

function sortScopesByProgressAsc(scopes: Scopes) {
  return [...scopes].sort((a, b) => {
    const aProgress = a?.progress || 0;
    const bProgress = b?.progress || 0;
    if (aProgress !== bProgress) { return aProgress - bProgress; }

    return compareStringAlphabetically(a?.title, b?.title);
  });
}
function sortScopesByProgressDesc(scopes: Scopes) {
  return [...scopes].sort((a, b) => {
    const aProgress = a?.progress || 0;
    const bProgress = b?.progress || 0;
    if (aProgress !== bProgress) { return bProgress - aProgress; }

    return compareStringAlphabetically(a?.title, b?.title);
  });
}

function sortScopesByTitle(scopes: Scopes) {
  return [...scopes].sort((a, b) => compareStringAlphabetically(a?.title, b?.title));
}

function compareStringAlphabetically(a?: string | null, b?: string | null) {
  const safeA = a || '';
  const safeB = b || '';
  if (safeA < safeB) { return -1; }
  if (safeA > safeB) { return 1; }
  return 0;
}
