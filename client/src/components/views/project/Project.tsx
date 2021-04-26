import React, { useEffect, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Button, Paper, Typography, useMediaQuery, useTheme,
} from '@material-ui/core';
import useDimensions from 'react-cool-dimensions';
import { useHistory, useParams } from 'react-router-dom';

import ErrorToast from '@/components/ErrorToast';
import LoadingIndicator from '@/components/LoadingIndicator';
import HillChart, { UpdatedItemsMap, VIEW_BOX } from '@/components/hillChart/HillChart';
import routes from '@/routes';

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
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const { ref: chartContainerRef, width } = useDimensions<HTMLDivElement>();
  const [enableProgressEdit, setEnableProgressEdit] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery<ProjectPage>(PROJECT_DETAILS, { variables: { id }, skip: !id });
  const [updateProject] = useMutation<UpdateScopeProgresses, UpdateScopeProgressesVariables>(
    UPDATE_SCOPE_PROGRESSES,
  );
  const [hasError, setHasError] = useState(false);
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

  // TODO: Tweak the backend to make this more graceful
  // If the project doesn't exist, send the user to the projects page for now.
  useEffect(() => {
    if (!loading && !data) {
      history.replace(routes.projects);
    }
  }, [loading, data]);

  const chartHeight = (VIEW_BOX.y / VIEW_BOX.x) * width;

  const scopes = data?.project?.scopes || [];
  return (
    <div className="h-full p-4 flex justify-center">
      <Paper className="h-full w-full p-4 flex flex-col items-center" style={{ maxWidth: 1600 }}>
        <div
          className={`flex justify-center w-full pb-4 relative ${isMobile ? 'items-center h-full' : ''}`}
        >
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
          <div ref={chartContainerRef} style={{ width: isMobile ? '100%' : '80%', height: chartHeight }}>
            <HillChart
              width="100%"
              height="100%"
              data={scopes}
              allowEdit={enableProgressEdit}
              onSave={handleSave}
              onCancel={() => setEnableProgressEdit(false)}
            />
          </div>
        </div>
        {!data && loading ? <LoadingIndicator /> : (
          !isMobile && (
            <>
              <div className="w-full px-4" style={{ maxWidth: 1200 }}>
                <Typography variant="h6" component="h2">{data?.project?.title}</Typography>
              </div>
              <ScopeList scopes={scopes} projectId={id} />
            </>
          )
        )}
      </Paper>
      <ErrorToast open={hasError} onClose={() => setHasError(false)} />
    </div>
  );
}
