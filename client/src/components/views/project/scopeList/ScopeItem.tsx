import React, { useState, MouseEvent } from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  Button,
  IconButton, Menu, MenuItem, Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreVert';

import DeleteConfirmationModal from '@/components/ConfirmationModal';
import { removeCacheItem } from '@/utils/cache';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import EditScopeModal from './EditScopeModal';
import EditScopeProgressModal from './EditScopeProgressModal';
import ScopeDot from './ScopeDot';
import { DeleteScope, DeleteScopeVariables } from './types/DeleteScope';

type Props = {
  scope: Scope;
}

const DELETE_SCOPE = gql`
  mutation DeleteScope($id: ID!) {
    deleteScopeById(id: $id) {
      id
    }
  }
`;

export default function ScopeItem({ scope }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLButtonElement>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpdateProgressModal, setShowUpdateProgressModal] = useState(false);
  const [destroyScope] = useMutation<DeleteScope, DeleteScopeVariables>(
    DELETE_SCOPE,
    removeCacheItem<DeleteScope, DeleteScopeVariables>('scopes', 'deleteScopeById', `Project:${scope.projectId}`),
  );

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleEdit = () => {
    setMenuAnchor(null);
    setShowEditModal(true);
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
    setShowUpdateProgressModal(false);
  };

  const deleteScope = () => {
    destroyScope({ variables: { id: scope.id } });
    setShowDeleteConfirmation(false);
  };

  const inProgress = scope.progress > 0 && scope.progress < 100;
  const completed = scope.progress === 100;

  return (
    <div className="p-2 flex justify-between">
      <div className="flex items-center flex-grow">
        <ScopeDot color={scope.color} />
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
      {showEditModal && (
        <EditScopeModal
          scopeId={scope.id}
          open={showEditModal}
          onClose={handleCancelAction}
        />
      )}
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
