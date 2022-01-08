import React, { useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import AddProjectModal from './AddProjectModal';
import ProjectCard from './ProjectCard';

export default function AddProjectCard() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <ProjectCard className="bg-blue-50 hover:bg-blue-100" onClick={() => setOpenModal(true)}>
        <AddCircleIcon className="text-5xl" color="secondary" />
      </ProjectCard>
      <AddProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
