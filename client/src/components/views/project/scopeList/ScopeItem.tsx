import React, { useState, MouseEvent } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import DragIcon from '@mui/icons-material/DragIndicator';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import MoreIcon from '@mui/icons-material/MoreVert';
import BoltIcon from '@mui/icons-material/OfflineBolt';
import StarIcon from '@mui/icons-material/StarBorder';
import {
  Button,
  IconButton, Menu, MenuItem, Tooltip, Typography,
} from '@mui/material';

import useDeleteFlag from '@/api/mutations/useDeleteFlag';
import useDeleteScope from '@/api/mutations/useDeleteScope';
import useUpdateScope from '@/api/mutations/useUpdateScope';
import DeleteConfirmationModal from '@/components/ConfirmationModal';

import { ProjectScope } from '../helpers';

import AddFlagModal from './AddFlagModal';
import EditScopeModal from './EditScopeModal';
import EditScopeProgressModal from './EditScopeProgressModal';
import NiceToHaveChip from './NiceToHaveChip';
import ScopeDot from './ScopeDot';
import useScopeDnd from './useScopeDnD';

type Props = {
  scope: ProjectScope;
  findScopeIndex: (scopeId: string) => number;
  moveScope: (scopeId: string, toIndex: number, moveComplete: boolean) => void;
  dragEnabled?: boolean;
  disableUpdateProgress?: boolean;
  disableActions?: boolean;
}

export default function ScopeItem({
  scope, dragEnabled, findScopeIndex, moveScope, disableUpdateProgress, disableActions,
}: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const [removeFlag] = useDeleteFlag();
  const [updateScope] = useUpdateScope();
  const [destroyScope] = useDeleteScope(scope.projectId);

  const [dragRef, dropRef, preview] = useScopeDnd(scope, moveScope, findScopeIndex, !!dragEnabled);

  const isFlagged = !!scope.flag;

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleEdit = () => {
    setMenuAnchor(null);
    setShowEditModal(true);
  };

  const handleFlag = () => {
    setMenuAnchor(null);
    if (isFlagged) {
      removeFlag({ variables: { id: scope.flag!.id } });
    } else {
      setShowFlagModal(true);
    }
  };

  const toggleNiceToHave = () => {
    setMenuAnchor(null);
    updateScope({ variables: { id: scope.id, niceToHave: !scope.niceToHave } });
  };

  const handleDelete = () => {
    setMenuAnchor(null);
    setShowDeleteConfirmation(true);
  };

  const handleUpdateProgress = () => {
    setShowUpdateProgressModal(true);
  };

  const handleCancelAction = () => {
    setShowDeleteConfirmation(false);
    setShowEditModal(false);
    setShowFlagModal(false);
    setShowUpdateProgressModal(false);
  };

  const deleteScope = () => {
    destroyScope({ variables: { id: scope.id } });
    setShowDeleteConfirmation(false);
  };

  const inProgress = scope.progress > 0 && scope.progress < 100;
  const completed = scope.progress === 100;

  const flagger = scope.flag?.createdBy?.name || scope.flag?.createdBy?.email;

  return (
    <div ref={(node) => dropRef(preview(node))} className="p-2 flex justify-between">
      <div className="flex items-center flex-grow">
        <button ref={dragRef} type="button" disabled={!dragEnabled} className="disabled:cursor-not-allowed">
          <DragIcon className={dragEnabled ? 'text-gray-400 cursor-move' : 'text-gray-100'} />
        </button>
        <ScopeDot color={scope.color} />
        {isFlagged && (
          <Tooltip
            title={(
              <div className="text-xs">
                {scope.flag!.message ? (
                  <>
                    <p>{scope.flag!.message}</p>
                    <div className="mt-1 text-right">
                      -
                      {' '}
                      {flagger}
                    </div>
                  </>
                ) : (
                  <div className="italic">
                    Flagged by
                    {' '}
                    {flagger}
                  </div>
                )}
              </div>
            )}
            placement="top"
            classes={{ tooltip: 'bg-white text-gray-800 border border-solid border-primary' }}
          >
            <FlagIcon className="text-danger ml-2" />
          </Tooltip>
        )}
        <Typography className={`ml-2 ${inProgress ? 'font-bold' : ''} ${completed ? 'line-through' : ''}`} style={{ maxWidth: '70%' }}>
          {scope.niceToHave && <NiceToHaveChip className="mr-1" />}
          {scope.title}
        </Typography>
        <Typography className={`ml-3 text-sm text-gray-600 ${inProgress ? 'font-bold' : ''}`}>
          (
          {summaryForProgress(scope.progress)}
          )
        </Typography>
      </div>
      <div className="flex items-center flex-shrink-0">
        {!disableUpdateProgress && (
          <Button style={{ width: 180 }} className="mr-3" variant="outlined" color="primary" onClick={handleUpdateProgress}>
            Update Progress
          </Button>
        )}
        <IconButton size="small" onClick={handleMenuOpen} disabled={disableActions}>
          <MoreIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} keepMounted>
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" className="mr-3" />
          Edit
        </MenuItem>
        <MenuItem onClick={toggleNiceToHave}>
          {scope.niceToHave ? (
            <BoltIcon fontSize="small" className="mr-3 text-primary" />
          ) : (
            <StarIcon fontSize="small" className="mr-3 text-primary" />
          )}
          {scope.niceToHave ? 'Mark as required' : 'Mark as nice to have'}
        </MenuItem>
        <MenuItem onClick={handleFlag}>
          <FlagIcon fontSize="small" className="mr-3 text-danger" />
          {isFlagged ? 'Remove Flag' : 'Flag for discussion'}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" className="mr-3" />
          Delete
        </MenuItem>
      </Menu>
      <DeleteConfirmationModal
        open={showDeleteConfirmation}
        onCancel={handleCancelAction}
        onConfirm={deleteScope}
        title={`Are you sure you want to delete "${scope?.title}"?`}
        text="This action cannot be undone."
        confirmText="Delete"
        confirmButtonClassName="text-white bg-danger"
      />
      <EditScopeModal
        scope={scope}
        open={showEditModal}
        onClose={handleCancelAction}
      />
      <AddFlagModal
        scope={scope}
        open={showFlagModal}
        onClose={handleCancelAction}
      />
      {showUpdateProgressModal && (
        <EditScopeProgressModal
          scope={scope}
          open={showUpdateProgressModal}
          onClose={handleCancelAction}
        />
      )}
    </div>
  );
}

function summaryForProgress(progress: number) {
  let summary = 'Done';
  if (progress === 0) {
    summary = 'Not started';
  } else if (progress < 10) {
    summary = 'Getting started';
  } else if (progress < 30) {
    summary = 'De-risking';
  } else if (progress < 48) {
    summary = 'Mostly derisked';
  } else if (progress < 60) {
    summary = 'Derisked';
  } else if (progress < 80) {
    summary = 'Implementing';
  } else if (progress < 100) {
    summary = 'Wrapping up';
  }

  return summary;
}
