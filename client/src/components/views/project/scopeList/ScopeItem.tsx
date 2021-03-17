import React, { useState, MouseEvent } from 'react';

import { gql, useMutation } from '@apollo/client';
import {
  IconButton, Menu, MenuItem, Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreVert';

import DeleteConfirmationModal from '@/components/ConfirmationModal';
import { removeCacheItem } from '@/utils/cache';

import { ProjectPage_project_scopes as Scope } from '../types/ProjectPage';

import EditScopeModal from './EditScopeModal';
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

  const handleCancelAction = () => {
    setShowDeleteConfirmation(false);
    setShowEditModal(false);
  };

  const deleteScope = () => {
    destroyScope({ variables: { id: scope.id } });
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="p-2 flex justify-between">
      <div className="flex items-center">
        <ScopeDot color={scope.color} />
        <Typography className="ml-2">{scope.title}</Typography>
      </div>
      <IconButton size="small" onClick={handleMenuOpen}>
        <MoreIcon fontSize="inherit" />
      </IconButton>
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
    </div>
  );
}
