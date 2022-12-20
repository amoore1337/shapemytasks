import React, { useEffect } from 'react';

import { Typography } from '@mui/material';

import Modal from '@/components/Modal';
import { useUpdateProject } from '@/models/project';
import { Project } from '@/models/types';

import ProjectModalForm, { FormValues } from './ProjectModalForm';

type Props = {
  project: Project;
  open: boolean;
  onClose?: () => void;
};

export default function EditProjectModal({ onClose, project, ...props }: Props) {
  const [updateProject, { loading, called }] = useUpdateProject();

  const handleSubmit = (values: FormValues) =>
    updateProject({ variables: { id: project.id, ...values } });

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
        width: '60%',
        height: '80%',
        maxWidth: 400,
        maxHeight: 500,
      }}
    >
      <div className="flex h-full flex-col">
        <Typography variant="h4" className="text-2xl">
          Edit Project
        </Typography>
        <ProjectModalForm
          onSubmit={handleSubmit}
          disabled={loading}
          initialValues={{
            title: project?.title || '',
            description: project?.description || '',
          }}
        />
      </div>
    </Modal>
  );
}
