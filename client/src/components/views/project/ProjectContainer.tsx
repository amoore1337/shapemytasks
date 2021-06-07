import React, { useEffect, useState } from 'react';

import {
  gql, useMutation, useQuery, useSubscription,
} from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';

import { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import routes from '@/routes';

import Project from './Project';
import {
  findScopeIndex,
  moveArrayItem, Scopes, SCOPE_SORT_OPTIONS, SortOption,
} from './helpers';
import { ProjectPage, ProjectPage_project_scopes as Scope } from './types/ProjectPage';
import { UpdateScopePosition, UpdateScopePositionVariables } from './types/UpdateScopePosition';
import { UpdateScopeProgresses, UpdateScopeProgressesVariables } from './types/UpdateScopeProgresses';

const SCOPE_FRAGMENT = gql`
  fragment ScopeFragment on Scope {
    id
    title
    progress
    color
    projectId
    position
    createdAt
    updatedAt
  }
`;

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

const NEW_SCOPE_SUBSCRIPTION = gql`
  subscription ProjectScopeSubscription {
    scopeCreated(projectId:"1") {
      ...ScopeFragment
    }
  }
  ${SCOPE_FRAGMENT}
`;

export default function ProjectContainer() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });
  const [updateScopeProgress] = useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(
    UPDATE_SCOPE_PROGRESSES,
  );
  const [updateScopePosition] = useMutation<UpdateScopePosition, UpdateScopePositionVariables>(
    UPDATE_SCOPE_POSITION,
  );

  // useSubscription(NEW_SCOPE_SUBSCRIPTION);

  const [hasError, setHasError] = useState(false);
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

  useEffect(() => {
    if (!hasError && error) {
      setHasError(true);
    }
  }, [error]);

  useEffect(() => {
    const scopes = data?.project?.scopes || [];
    setSortedScopes(sortOption.sort(scopes));
  }, [sortOption, data]);

  useEffect(() => {
    if (!loading && !data) {
      history.replace(routes.projects);
    }
  }, [loading, data]);

  const handleSortChange = (value: string) => {
    const newOption = SCOPE_SORT_OPTIONS.find((o) => o.value === value);
    setSortOption(newOption || SCOPE_SORT_OPTIONS[0]);
  };

  return (
    <Project
      project={data?.project}
      scopes={sortedScopes}
      scopeSortOption={sortOption}
      onScopeSortChange={handleSortChange}
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
