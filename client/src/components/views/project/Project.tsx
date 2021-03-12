import { gql, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import HillChart from '../../hillChart/HillChart';
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
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });

  const scopes = data?.project?.scopes || [];
  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        <div className="flex justify-center w-full pb-4" style={{ height: '75%', maxHeight: 400 }}>
          <HillChart width="80%" height="100%" data={scopes} allowEdit />
        </div>
        <ScopeList scopes={scopes} projectId={id} />
      </Paper>
    </div>
  );
}
