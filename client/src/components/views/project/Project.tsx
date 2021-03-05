import { gql, useQuery } from '@apollo/client';
import { Paper } from '@material-ui/core';
import React from 'react';
// import tw, { styled } from 'twin.macro';
import { useParams } from 'react-router-dom';
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
      }
    }
  }
`;

// const ContentContainer = styled.div`
//   ${tw`flex-grow overflow-hidden`}
//   flex-basis: 1px;
// `;

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });

  const scopes = data?.project?.scopes || [];
  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        <div className="flex justify-center w-full pb-4" style={{ height: '50%' }}>
          <div className="bg-gray-100 h-full" style={{ width: '80%' }} />
        </div>
        <ScopeList scopes={scopes} projectId={id} />
      </Paper>
    </div>
  );
}
