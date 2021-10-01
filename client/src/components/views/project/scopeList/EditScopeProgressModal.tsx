import React, { useEffect, useState } from 'react';

import useUpdateScopeProgressById from '@/api/mutations/useUpdateScopeProgressById';
import Modal from '@/components/Modal';
import HillChart, { UpdatedItemsMap } from '@/components/hillChart/HillChart';

import { ProjectScope } from '../helpers';

type Props = {
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
}

export default function EditScopeProgressModal({ onClose, scope, ...props }: Props) {
  const [enableProgressEdit, setEnableProgressEdit] = useState(true);
  const [updateScope, { loading, called }] = useUpdateScopeProgressById();

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
