import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddProjectModal from './AddProjectModal';
import ProjectCard from './ProjectCard';

export default function AddProjectCard() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ProjectCard className="bg-blue-50 hover:bg-blue-100" onClick={() => setOpenModal(true)}>
        <div className="flex items-center text-secondary">
          <AddCircleIcon className="text-4xl mr-2" color="secondary" />
          Add Project
        </div>
      </ProjectCard>
      <AddProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
