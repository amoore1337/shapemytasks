import React, { useEffect, useState } from 'react';

import { gql, useMutation } from '@apollo/client';

import Modal from '@/components/Modal';
import HillChart, { UpdatedItemsMap } from '@/components/hillChart/HillChart';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import { UpdateScopeProgress, UpdateScopeProgressVariables } from './types/UpdateScopeProgress';

const UPDATE_SCOPE_PROGRESS = gql`
  mutation UpdateScopeProgress($id: ID!, $progress: Float) {
    updateScope(id: $id, progress: $progress) {
      id
      title
      description
      progress
    }
  }
`;

type Props = {
  scope: Scope;
  open: boolean;
  onClose?: () => void;
}

export default function EditScopeProgressModal({ onClose, scope, ...props }: Props) {
  const [enableProgressEdit, setEnableProgressEdit] = useState(true);
  const [updateScope, { loading, called }] = useMutation<UpdateScopeProgress, UpdateScopeProgressVariables>(
    UPDATE_SCOPE_PROGRESS,
  );

  const handleSave = (updatedItems: UpdatedItemsMap) => {
    setEnableProgressEdit(false);
    updateScope({ variables: { id: scope.id, progress: updatedItems[scope.id] } });
  };

  const handleClose = () => {
    setEnableProgressEdit(false);
    if (onClose) { onClose(); }
  };

  useEffect(() => {
    if (!loading && called) {
      setEnableProgressEdit(false);
      handleClose();
    }
  }, [loading, called]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '95%', height: '80%', maxWidth: 1200, maxHeight: 800,
      }}
      noCloseButton
    >
      <div className="flex flex-col h-full pt-10">
        <HillChart
          width="100%"
          height="100%"
          data={[scope]}
          allowEdit={enableProgressEdit}
          onSave={handleSave}
          onCancel={handleClose}
        />
      </div>
    </Modal>
  );
}
