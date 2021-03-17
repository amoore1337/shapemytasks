import React, { useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Button, Paper } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import HillChart, { UpdatedItemsMap } from '../../hillChart/HillChart';

import ScopeList from './scopeList/ScopeList';
import { ProjectPage } from './types/ProjectPage';

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

export default function Project() {
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });

  const handleSave = (updatedItems: UpdatedItemsMap) => {
    setEnableProgressEdit(false);
    console.log('saved!', updatedItems);
  };

  const scopes = data?.project?.scopes || [];
  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        <div className="flex justify-center w-full pb-4 relative" style={{ height: '75%', maxHeight: 400 }}>
          {!enableProgressEdit && (
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
