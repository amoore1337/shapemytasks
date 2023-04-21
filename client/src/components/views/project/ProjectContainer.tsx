import { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import { gql } from '@/apollo';
import type { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import { useRegisterProjectSubscriptions } from '@/models/project';
import { useUpdateScopePosition, useUpdateScopeProgresses } from '@/models/scope';
import type { Project as IProject } from '@/models/types';
import routes from '@/routes';

import type { FilterOption, ProjectScope, Scopes, SortOption } from './helpers';
import { findScopeIndex, moveArrayItem, SCOPE_FILTER_OPTIONS, SCOPE_SORT_OPTIONS } from './helpers';
import Project from './Project';

const PROJECT_QUERY = gql(`
  query Project($id: ID!) {
    project(id: $id) {
      ...ProjectFragment
      scopes {
        ...ScopeFragment
      }
    }
  }
`);

export default function ProjectContainer() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(PROJECT_QUERY, { variables: { id: id! }, skip: !id });
  const [updateScopeProgress] = useUpdateScopeProgresses();
  const [updateScopePosition] = useUpdateScopePosition();

  useRegisterProjectSubscriptions(data?.project as IProject);

  const navigate = useNavigate();

  const [hasError, setHasError] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>(SCOPE_FILTER_OPTIONS[0]);
  const [sortOption, setSortOption] = useState<SortOption>(SCOPE_SORT_OPTIONS[0]);
  const [sortedScopes, setSortedScopes] = useState<Scopes>([]);

  const handleSave = async (updatedItems: UpdatedItemsMap) => {
    setEnableProgressEdit(false);
    const updates: { id: string; progress: number }[] = [];
    Object.keys(updatedItems).forEach((itemId) => {
      updates.push({ id: itemId, progress: updatedItems[itemId] });
    });
    try {
      await updateScopeProgress({ variables: { inputs: updates } });
    } catch (err) {
      setHasError(true);
    }
  };

  const handleScopePositionUpdate = async (scopeId: string, targetIndex: number) => {
    try {
      await updateScopePosition({ variables: { id: scopeId, targetIndex } });
    } catch (err) {
      setHasError(true);
    }
  };

  const moveScope = (scopeId: string, toIndex: number, moveComplete: boolean) => {
    const fromIndex = findScopeIndex(sortedScopes, scopeId);
    const scope = sortedScopes[fromIndex];
    if (!scope) {
      return;
    }

    const updatedScopes = moveArrayItem<ProjectScope | null>(sortedScopes, fromIndex, toIndex);
    setSortedScopes(updatedScopes);

    if (moveComplete) {
      handleScopePositionUpdate(scopeId, toIndex);
    }
  };

  // Reset sort/filter when toggling between projects:
  useEffect(() => {
    setSortOption(SCOPE_SORT_OPTIONS[0]);
    setFilterOption(SCOPE_FILTER_OPTIONS[0]);
  }, [id]);

  useEffect(() => {
    if (!hasError && error) {
      setHasError(true);
    }
  }, [error, hasError]);

  useEffect(() => {
    const scopes = (data?.project?.scopes as Exclude<Scopes, null>) || [];
    let scopeList = sortOption.sort(scopes);
    scopeList = filterOption.filter(scopeList);
    setSortedScopes(scopeList);
  }, [sortOption, filterOption, data]);

  useEffect(() => {
    if (!loading && !data?.project) {
      navigate(routes.projects);
    }
  }, [loading, data, navigate]);

  const handleSortChange = (value: string) => {
    const newOption = SCOPE_SORT_OPTIONS.find((o) => o.value === value);
    setSortOption(newOption || SCOPE_SORT_OPTIONS[0]);
  };

  const handleFilterChange = (value: string) => {
    const newOption = SCOPE_FILTER_OPTIONS.find((o) => o.value === value);
    setFilterOption(newOption || SCOPE_FILTER_OPTIONS[0]);
  };

  return (
    <Project
      project={data?.project as IProject}
      allScopes={(data?.project?.scopes as Scopes) || []}
      scopes={sortedScopes}
      scopeSortOption={sortOption}
      onScopeSortChange={handleSortChange}
      scopeFilterOption={filterOption}
      onScopeFilterChange={handleFilterChange}
      onHillChartSave={handleSave}
      onHillChartEditClick={() => setEnableProgressEdit(true)}
      onHillChartEditCancel={() => setEnableProgressEdit(false)}
      showError={hasError}
      onErrorToastDismiss={() => setHasError(false)}
      hillChartEditEnabled={enableProgressEdit}
      loading={loading}
      moveScope={moveScope}
    />
  );
}
