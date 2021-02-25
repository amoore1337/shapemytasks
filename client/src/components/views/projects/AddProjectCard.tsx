import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddProjectModal from './AddProjectModal';

const StyledCard = styled(Button)`
  ${tw`bg-blue-50 p-2 shadow`}
  width: 265px;
  height: 200px;

  &:hover {
    ${tw`bg-blue-100`}
  }
`;

export default function AddProjectCard() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <StyledCard className="text-center p-8" onClick={() => setOpenModal(true)}>
        <AddCircleIcon className="text-5xl" color="secondary" />
      </StyledCard>
      <AddProjectModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
