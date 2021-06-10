import React, { useContext, useEffect } from 'react';

import { gql, useMutation } from '@apollo/client';
import { Typography } from '@material-ui/core';

import { CurrentUserContext } from '@/CurrentUserContext';
import Modal from '@/components/Modal';
import { addCacheItem } from '@/utils/cache';

import ProjectModalForm, { FormValues } from './ProjectModalForm';
import { CreateProject, CreateProjectVariables } from './types/CreateProject';

const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String $visibility: String) {
    createProject(title: $title, description: $description, visibility: $visibility) {
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
    { update: (cache, { data: result }) => addCacheItem<CreateProject>(cache, result, 'projects', 'createProject') },
  );
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmit = (values: FormValues) => createProject({ variables: { ...values, visibility: currentUser?.team ? 'visible' : 'private' } });

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
