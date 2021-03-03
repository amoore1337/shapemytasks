import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import Modal from '../../Modal';
import { CreateProject, CreateProjectVariables } from './types/CreateProject';
import { addCacheItem } from '../../../cacheUtils';
import ProjectModalForm, { FormValues } from './ProjectModalForm';

const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String) {
    createProject(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type Props ={
  open: boolean;
  onClose?: () => void;
}

export default function AddProjectModal({ onClose, ...props }: Props) {
  const [createProject, { loading, called }] = useMutation<CreateProject, CreateProjectVariables>(
    CREATE_PROJECT,
    addCacheItem<CreateProject, CreateProjectVariables>('projects', 'createProject'),
  );

  const handleSubmit = (values: FormValues) => createProject({ variables: values });

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        <Typography variant="h4">Add Project</Typography>
        <ProjectModalForm onSubmit={handleSubmit} disabled={loading} />
      </div>
    </Modal>
  );
}
