import React, { useEffect, useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, TextField, Typography } from '@material-ui/core';

import LoadingIndicator from '../../../LoadingIndicator';
import Modal from '../../../Modal';

import { QueryEditScope } from './types/QueryEditScope';
import { UpdateScope, UpdateScopeVariables } from './types/UpdateScope';

const FETCH_SCOPE = gql`
  query QueryEditScope($id: ID!) {
    scope(id: $id) {
      id
      title
    }
  }
`;

const UPDATE_SCOPE = gql`
  mutation UpdateScope($id: ID!, $title: String, $description: String) {
    updateScope(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type Props ={
  scopeId: string;
  open: boolean;
  onClose?: () => void;
}

export default function EditScopeModal({ onClose, scopeId, ...props }: Props) {
  const [title, setTitle] = useState('');
  const [showError, setShowError] = useState(false);
  const { data, loading: loadingScope } = useQuery<QueryEditScope>(FETCH_SCOPE, { variables: { id: scopeId } });
  const [updateProject, { loading, called }] = useMutation<UpdateScope, UpdateScopeVariables>(
    UPDATE_SCOPE,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setShowError(true);
      return;
    }

    updateProject({ variables: { id: scopeId, title } });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (showError && event.target.value) {
      setShowError(false);
    }
  };

  useEffect(() => {
    if (!loading && called && onClose) {
      onClose();
    }
  }, [loading, called]);

  useEffect(() => {
    const { scope } = data || {};
    if (scope?.title && scope.title !== title) {
      setTitle(scope.title);
    }
  }, [data]);

  return (
    <Modal
      {...props}
      onClose={onClose}
      style={{
        width: '60%', height: '80%', maxWidth: 400, maxHeight: 500,
      }}
    >
      <div className="flex flex-col h-full">
        {loadingScope ? (
          <LoadingIndicator />
        ) : (
          <>
            <Typography variant="h4">Edit Scope</Typography>
            <form noValidate autoComplete="off" className="pt-8 flex-1 flex flex-col justify-between" onSubmit={handleSubmit}>
              <TextField
                size="small"
                color="secondary"
                label="Project Title"
                variant="outlined"
                name="title"
                value={title}
                onChange={handleChange}
                error={showError}
                helperText={showError && 'Please provide a title.'}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className="text-white"
              >
                Save
              </Button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}
