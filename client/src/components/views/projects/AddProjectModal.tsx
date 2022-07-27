import React, { useContext, useEffect } from 'react';

import { Typography } from '@mui/material';

import { CurrentUserContext } from '@/CurrentUserContext';
import useCreateProject from '@/api/mutations/useCreateProject';
import Modal from '@/components/Modal';

import ProjectModalForm, { FormValues } from './ProjectModalForm';

type Props ={
  open: boolean;
  onClose?: () => void;
}

export default function AddProjectModal({ onClose, ...props }: Props) {
  const [createProject, { loading, called }] = useCreateProject();
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
        <Typography variant="h4" className="text-2xl">Add Project</Typography>
        <ProjectModalForm onSubmit={handleSubmit} disabled={loading} />
      </div>
    </Modal>
  );
}
