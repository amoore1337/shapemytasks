import { useCallback, useEffect, useState } from 'react';

import type { UpdatedItemsMap } from '@/components/hillChart/HillChart';
import HillChart from '@/components/hillChart/HillChart';
import Modal from '@/components/Modal';
import { useUpdateScopeProgressById } from '@/models/scope';

import type { ProjectScope } from '../helpers';

type Props = {
  scope: ProjectScope;
  open: boolean;
  onClose?: () => void;
};

export default function EditScopeProgressModal({ onClose, scope, ...props }: Props) {
  const [data, setData] = useState([scope]);
  const [enableProgressEdit, setEnableProgressEdit] = useState(true);
  const [updateScope, { loading, called }] = useUpdateScopeProgressById();

  const handleSave = useCallback(
    (updatedItems: UpdatedItemsMap) => {
      updateScope({ variables: { id: scope.id, progress: updatedItems[scope.id] } });
      setEnableProgressEdit(false);
    },
    [scope.id, updateScope]
  );

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
    setEnableProgressEdit(false);
  }, [onClose]);

  useEffect(() => {
    if (!loading && called) {
      handleClose();
      setEnableProgressEdit(false);
    }
  }, [loading, called, handleClose]);

  useEffect(() => {
    if (!data || data[0]?.id !== scope.id) {
      setData([scope]);
    }
  }, [data, scope]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '95%',
        height: '80%',
        maxWidth: 1200,
        maxHeight: 800,
      }}
      noCloseButton
    >
      <div className="flex h-full flex-col pt-10">
        <HillChart
          width="100%"
          height="100%"
          data={data}
          allowEdit={enableProgressEdit}
          onSave={handleSave}
          onCancel={handleClose}
        />
      </div>
    </Modal>
  );
}
