import React, { useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import HillChart, { UpdatedItemsMap } from '@/components/hillChart/HillChart';

import ScopeList from './scopeList/ScopeList';
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

export default function Project() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });
  const [updateProject] = useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(
    UPDATE_SCOPE_PROGRESSES,
  );

  const handleSave = (updatedItems: UpdatedItemsMap) => {
    setEnableProgressEdit(false);
    const updates: { id: string, progress: number }[] = [];
    Object.keys(updatedItems).forEach((itemId) => {
      updates.push({ id: itemId, progress: updatedItems[itemId] });
    });
    updateProject({ variables: { inputs: updates } });
  };

  const scopes = data?.project?.scopes || [];
  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        <div className="flex justify-center w-full pb-4 relative" style={{ height: '75%', maxHeight: 400 }}>
          {!enableProgressEdit && scopes.length > 0 && (
            <Button
              className="text-white absolute top-8 left-8 z-10"
              variant="contained"
              color="secondary"
              onClick={() => setEnableProgressEdit(true)}
            >
              Update Progress
            </Button>
          )}
          <HillChart
            width="80%"
            height="100%"
            data={scopes}
            allowEdit={enableProgressEdit}
            onSave={handleSave}
            onCancel={() => setEnableProgressEdit(false)}
          />
        </div>
        <ScopeList scopes={scopes} projectId={id} />
      </Paper>
    </div>
  );
}
