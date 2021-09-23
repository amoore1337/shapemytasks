import React, { useState, MouseEvent } from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  Button,
  IconButton, Menu, MenuItem, Tooltip, Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';
import MoreIcon from '@material-ui/icons/MoreVert';

import DeleteConfirmationModal from '@/components/ConfirmationModal';
import { removeCacheItem } from '@/utils/cache';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import AddFlagModal from './AddFlagModal';
import EditScopeModal from './EditScopeModal';
import EditScopeProgressModal from './EditScopeProgressModal';
import ScopeDot from './ScopeDot';
import { DeleteFlag, DeleteFlagVariables } from './types/DeleteFlag';
import { DeleteScope, DeleteScopeVariables } from './types/DeleteScope';
import useScopeDnd from './useScopeDnD';

type Props = {
  scope: Scope;
  findScopeIndex: (scopeId: string) => number;
  moveScope: (scopeId: string, toIndex: number, moveComplete: boolean) => void;
  dragEnabled?: boolean;
}

const DELETE_SCOPE = gql`
  mutation DeleteScope($id: ID!) {
    deleteScopeById(id: $id) {
      id
    }
  }
`;

const DELETE_FLAG = gql`
  mutation DeleteFlag($id: ID!) {
    deleteFlagById(id: $id) {
      id
    }
  }
`;

export default function ScopeItem({
  scope, dragEnabled, findScopeIndex, moveScope,
}: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const [removeFlag] = useMutation<DeleteFlag, DeleteFlagVariables>(DELETE_FLAG);
  const [destroyScope] = useMutation<DeleteScope, DeleteScopeVariables>(
    DELETE_SCOPE,
    {
      update: (cache, { data: result }) => (
        removeCacheItem<DeleteScope>(cache, result, 'scopes', 'deleteScopeById', `Project:${scope.projectId}`)
      ),
    },
  );

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
                <p>{scope.flag!.message}</p>
                <div className="mt-1 text-right">
                  -
                  {' '}
                  {scope.flag!.createdBy!.name || scope.flag!.createdBy!.email}
                </div>
              </div>
            )}
            placement="top"
            classes={{ tooltip: 'bg-white text-gray-800 border border-solid border-secondary' }}
          >
            <FlagIcon className="text-danger ml-2" />
          </Tooltip>
        )}
        <Typography className={`ml-2 ${inProgress ? 'font-bold' : ''} ${completed ? 'line-through' : ''}`} style={{ maxWidth: '70%' }}>
          {scope.title}
        </Typography>
        <Typography className={`ml-3 text-sm text-gray-600 ${inProgress ? 'font-bold' : ''}`}>
          (
          {summaryForProgress(scope.progress)}
          )
        </Typography>
      </div>
      <div className="flex items-center flex-shrink-0">
        <Button style={{ width: 180 }} className="mr-3" variant="outlined" color="secondary" onClick={handleUpdateProgress}>Update Progress</Button>
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)} keepMounted>
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" className="mr-3" />
          Edit
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
