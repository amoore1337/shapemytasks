import React, { useEffect, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';

import { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import routes from '@/routes';

import Project from './Project';
import { Scopes, SCOPE_SORT_OPTIONS, SortOption } from './helpers';
import { ProjectPage } from './types/ProjectPage';
import { UpdateScopeProgresses, UpdateScopeProgressesVariables } from './types/UpdateScopeProgresses';

const PROJECT_DETAILS = gql`
  query ProjectPage($id: ID!) {
    project(id: $id) {
      id
      title
      description
      scopes {
        id
        title
        progress
        color
        projectId
        position
      }
    }
  }
`;

const UPDATE_SCOPE_PROGRESSES = gql`
  mutation UpdateScopeProgresses($inputs: [BatchUpdateScopeProgressMap!]!) {
    batchUpdateScopeProgress(inputs: $inputs) {
      id
      title
      progress
      color
      projectId
    }
  }
`;

export default function ProjectContainer() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });
  const [updateProject] = useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(
    UPDATE_SCOPE_PROGRESSES,
  );
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
      await updateProject({ variables: { inputs: updates } });
    } catch (err) {
      setHasError(true);
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
    />
  );
}
