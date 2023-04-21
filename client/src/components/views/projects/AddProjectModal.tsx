import Modal from '@/components/Modal';
import { useCurrentUser } from '@/CurrentUserContext';
import { useCreateProject } from '@/models/project';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import type { FormValues } from './ProjectModalForm';
import ProjectModalForm from './ProjectModalForm';

type Props = {
  open: boolean;
  onClose?: () => void;
};

export default function AddProjectModal({ onClose, ...props }: Props) {
  const [createProject, { loading, called, reset }] = useCreateProject();
  const { currentUser } = useCurrentUser();

  const handleSubmit = (values: FormValues) =>
    createProject({
      variables: { ...values, visibility: currentUser?.team ? 'visible' : 'private' },
    });

  useEffect(() => {
    if (!loading && called && onClose) {
      reset();
      onClose();
    }
  }, [loading, called, onClose, reset]);

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
          Add Project
        </Typography>
        <ProjectModalForm onSubmit={handleSubmit} disabled={loading} />
      </div>
    </Modal>
  );
}
