import { ProjectPage_project_scopes as ProjectScopes } from './types/ProjectPage';

export type Scopes = (ProjectScopes | null)[];

export type SortOption = {
  label: string;
  value: string;
  sort: (scopes: Scopes) => Scopes;
}

export const SCOPE_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Created At',
    value: 'id',
    sort: sortScopesById,
  },
  {
    label: 'Progress (Low to High)',
    value: 'progress_asc',
    sort: sortScopesByProgressAsc,
  },
  {
    label: 'Progress (High to Low)',
    value: 'progress_desc',
    sort: sortScopesByProgressDesc,
  },
  {
    label: 'Title',
    value: 'title',
    sort: sortScopesByTitle,
  },
];

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
