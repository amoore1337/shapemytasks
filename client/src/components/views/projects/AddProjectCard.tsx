import { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddProjectModal from './AddProjectModal';
import ProjectCard from './ProjectCard';

export default function AddProjectCard() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ProjectCard className="bg-blue-50 hover:bg-blue-100">
        <button
          type="button"
          onClick={() => setOpenModal(true)}
          className="flex h-full w-full items-center justify-center text-secondary"
        >
          <AddCircleIcon className="mr-2 text-4xl" color="secondary" />
          Add Project
        </button>
      </ProjectCard>
      <AddProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
