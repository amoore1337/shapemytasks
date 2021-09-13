import React, { useEffect, useState } from 'react';

import {
  gql, useMutation, useQuery,
} from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';

import { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import routes from '@/routes';

import Project from './Project';
import {
  FilterOption,
  findScopeIndex,
  moveArrayItem, Scopes, SCOPE_FILTER_OPTIONS, SCOPE_FRAGMENT, SCOPE_SORT_OPTIONS, SortOption,
} from './helpers';
import { ProjectPage, ProjectPage_project_scopes as Scope } from './types/ProjectPage';
import { UpdateScopePosition, UpdateScopePositionVariables } from './types/UpdateScopePosition';
import { UpdateScopeProgresses, UpdateScopeProgressesVariables } from './types/UpdateScopeProgresses';
import useRegisterProjectSubscriptions from './useRegisterProjectSubscriptions';

const PROJECT_DETAILS = gql`
  query ProjectPage($id: ID!) {
    project(id: $id) {
      id
      title
      description
      scopes {
        ...ScopeFragment
      }
    }
  }
  ${SCOPE_FRAGMENT}
`;

const UPDATE_SCOPE_PROGRESSES = gql`
  mutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {
    batchUpdateScopeProgress(inputs: $inputs) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

const UPDATE_SCOPE_POSITION = gql`
  mutation UpdateScopePosition($id: ID!, $targetIndex: Int!) {
    updateScopePosition(id: $id, targetIndex: $targetIndex) {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function ProjectContainer() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<ProjectPage>(
    PROJECT_DETAILS,
    { variables: { id }, skip: !id },
  );
  const [updateScopeProgress] = useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(
    UPDATE_SCOPE_PROGRESSES,
  );
  const [updateScopePosition] = useMutation<UpdateScopePosition, UpdateScopePositionVariables>(
    UPDATE_SCOPE_POSITION,
  );

  useRegisterProjectSubscriptions(data?.project);

  const [hasError, setHasError] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOption>(SCOPE_FILTER_OPTIONS[0]);
  const [sortOption, setSortOption] = useState<SortOption>(SCOPE_SORT_OPTIONS[0]);
  const [sortedScopes, setSortedScopes] = useState<Scopes>([]);
  const history = useHistory();

  const handleSave = async (updatedItems: UpdatedItemsMap) => {
    setEnableProgressEdit(false);
    const updates: { id: string, progress: number }[] = [];
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
    if (!scope) { return; }

    const updatedScopes = moveArrayItem<Scope | null>(sortedScopes, fromIndex, toIndex);
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
  }, [error]);

  useEffect(() => {
    const scopes = data?.project?.scopes || [];
    let scopeList = sortOption.sort(scopes);
    scopeList = filterOption.filter(scopeList);
    setSortedScopes(scopeList);
  }, [sortOption, filterOption, data]);

  useEffect(() => {
    if (!loading && !data) {
      history.replace(routes.projects);
    }
  }, [loading, data]);

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
      project={data?.project}
      allScopes={data?.project?.scopes || []}
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
