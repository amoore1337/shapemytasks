import React, { useEffect } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';

import LoadingIndicator from '../../LoadingIndicator';
import Modal from '../../Modal';

import ProjectModalForm, { FormValues } from './ProjectModalForm';
import { ProjectDetails } from './types/ProjectDetails';
import { UpdateProject, UpdateProjectVariables } from './types/UpdateProject';

const FETCH_PROJECT = gql`
  query ProjectDetails($id: ID!) {
    project(id: $id) {
      title
      description
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $title: String, $description: String) {
    updateProject(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type Props ={
  projectId: string;
  open: boolean;
  onClose?: () => void;
}

export default function EditProjectModal({ onClose, projectId, ...props }: Props) {
  const { data, loading: loadingProject } = useQuery<ProjectDetails>(FETCH_PROJECT, { variables: { id: projectId } });
  const [updateProject, { loading, called }] = useMutation<UpdateProject, UpdateProjectVariables>(
    UPDATE_PROJECT,
  );

  const handleSubmit = (values: FormValues) => updateProject({ variables: { id: projectId, ...values } });

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  const { project } = data || {};
  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        {loadingProject ? (
          <LoadingIndicator />
        ) : (
          <>
            <Typography variant="h4">Edit Project</Typography>
            <ProjectModalForm
              onSubmit={handleSubmit}
              disabled={loading}
              initialValues={{
                title: project?.title || '',
                description: project?.description || '',
              }}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
